<?php

define("SECRETE_KEY", md5("@Lph4_NuM3r!C"));
define("SECRETE_IV", md5("@Lph4#NuM3r!C"));

/**
 * Encrypt
 *
 * @param string $string string to be encrypted
 * @return string 16 character
 *
 * Added By: Hasan Masud
 */
function encryptId($string)
{
    $encrypt_method = "AES-256-CBC";
    $key = hash( 'sha256', SECRETE_KEY );
    $iv = substr( hash( 'sha256', SECRETE_IV ), 0, 16 );
    return base64_encode( openssl_encrypt( $string, $encrypt_method, $key, 0, $iv ) );
}

/**
 * Decrypt
 *
 * @param string $encrypted_text string to be decrypted
 * @return string
 *
 * Added By: Hasan Masud
 */
function decryptId($encrypted_text): string
{
    $encrypt_method = "AES-256-CBC";
    $key = hash( 'sha256', SECRETE_KEY );
    $iv = substr( hash( 'sha256', SECRETE_IV ), 0, 16 );
    return openssl_decrypt( base64_decode( $encrypted_text ), $encrypt_method, $key, 0, $iv );
}
