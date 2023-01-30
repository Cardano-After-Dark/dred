import { EncryptedMessage } from "src/types/EncryptedMessage";
import { JsonMessagePayload } from "src/types/JsonMessagePayload";


//! it represents raw messages passed through Dred servers.
//! all top-level fields in a raw message are visible to the dred server.
//   see the 'scnt' field for encoding of encrypted messages.

export type RawMessage = {
    //! it carries an 'id' field, used by Dred servers in the neighborhood
    //   to deduplicate messages
    id: string;

    //! a raw message carrying a cleartext message uses the 'icnt' field.
    icnt: JsonMessagePayload;

    //! a raw message carrying encrypted content uses the 'scnt' field.
    scnt: EncryptedMessage;
};
