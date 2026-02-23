#!/usr/bin/env node
/**
 * Generate reqts.md from a JSONL source using EJS
 *
 * Usage: node generate-reqts.mjs <path/to/source.reqts.jsonl>
 *
 * Input file MUST have a .reqts.jsonl extension.
 * Output is written alongside the JSONL file, replacing .reqts.jsonl with .reqts.md.
 */

import ejs from 'ejs';
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join, resolve, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Read and parse JSONL
function readJsonl(path) {
    const content = readFileSync(path, 'utf-8');
    return content.trim().split('\n').map(line => JSON.parse(line));
}

if (!process.argv[2]) {
    console.error('Usage: node generate-reqts.mjs <path/to/source.reqts.jsonl>');
    process.exit(1);
}
const jsonlPath = resolve(process.argv[2]);
if (!jsonlPath.endsWith('.reqts.jsonl')) {
    console.error(`Error: Input file must have a .reqts.jsonl extension (got: ${basename(jsonlPath)})`);
    process.exit(1);
}
const templatePath = join(__dirname, 'reqts.template.ejs');

// Derive output path: foo.reqts.jsonl → foo.reqts.md
const jsonlDir = dirname(jsonlPath);
const jsonlName = basename(jsonlPath);
const outputName = jsonlName.replace('.reqts.jsonl', '.reqts.md');
const outputPath = join(jsonlDir, outputName);

const records = readJsonl(jsonlPath);

// Numeric-aware outline sort: "4.2.2" before "4.2.10"
function compareOutlines(a, b) {
    const pa = a.split('.').map(Number);
    const pb = b.split('.').map(Number);
    for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
        const na = pa[i] ?? 0;
        const nb = pb[i] ?? 0;
        if (na !== nb) return na - nb;
    }
    return 0;
}

// Organize data by type
const data = {
    module: records.find(r => r.type === 'module'),
    areas: records.filter(r => r.type === 'functional-area').sort((a, b) => a.order - b.order),
    requirements: records.filter(r => r.type === 'requirement').sort((a, b) => compareOutlines(a.outline, b.outline)),
    files: records.filter(r => r.type === 'file'),
    skills: records.filter(r => r.type === 'special-skill'),
    dependencies: records.filter(r => r.type === 'dependency'),
    dependents: records.filter(r => r.type === 'dependent'),
    implLog: records.filter(r => r.type === 'impl_log' || r.type === 'impl-log'),
};

// Build REQT-ID → title lookup for local requirements (used by dependents' needs resolution)
const reqtTitles = {};
data.requirements.forEach(r => { reqtTitles[r.reqt_id] = r.title; });
data.reqtTitles = reqtTitles;
// Expose compareOutlines to template for child/grandchild sorting
data.compareOutlines = compareOutlines;

const template = readFileSync(templatePath, 'utf-8');
const output = ejs.render(template, data);

writeFileSync(outputPath, output);
console.log(`Generated: ${outputPath}`);
