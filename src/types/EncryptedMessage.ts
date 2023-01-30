//! contains fields needed to transmit encrypted content from one
//  member of an encrypted Dred channel to the other members of
//  the channel

import { PubKey } from "src/types/PubKey";

export type EncryptedMessage = {
    //! it has the public key of the message originator
    originator: PubKey;
    //! it has a unique message-id (also used as nonce for encrypted content)
    msgId: string;
    //! it has a map of encrypted content, keyed by recipient pubkey
    content: {
        [key: PubKey]: string;
    };
    //! it supports group-targeted content and/or direct-message content, 
    //   simply by encrypting the data to the appropriate pubkeys and 
    //   labeling the ciphertext with those pubkeys in the 'content' structure.
 };
