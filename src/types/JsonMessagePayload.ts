//! it represents arbitrary key-value pairs of JSON extracted from EncryptedMessage#content
export type JsonMessagePayload = {
    [key: string]: string;
}