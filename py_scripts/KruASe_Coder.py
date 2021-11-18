# ALGORITHM
# Incoming string.
# Converting each character of the string into an integer where the first digit is a local key (that is used only at this
# stage), the second and the third form a two-digit number and other digits form the number of the position of the source
# character in the Unicode Table.
# The key and the two-digit number are used to find out the length of the position number using a formula:
# N = ((dd/key + key) / 10)^2, where "dd" is a two-digit number, and round N to the closest integer.
# Key is a random integer in the range from 1 to 4 and used to hide the always repeating digit "1" every 4 or 5 digits that
# could be suspicious.
# Then converting to binary number system, saving to a variable the number of digits "1" before first digit "0" in the
# beginning of the binary number (it will be a cipher key), deleting this digits "1" and inverting the number (all 1 turn 0
# and all 0 turn 1), so we have a binary number and a decimal cipher key.
# After this converting the binary to hexadecimal number system and applying Caesar Cipher on this hexadecimal number (as
# a string) using a sequence of hexadecimal digits (0123456789abcdef) as an alphabet and the cipher key we found out before
# as the shift.
# After applying, if there are digits "0" in the beginning of the number they are being deleted and their quantity will be
# added to the cipher key as the fractional part of it, else the cipher key is an integer.
# The last stage is converting the hexadecimal pseudo-number back to decimal.
# Thus, at the end of all operations we have a cipher and a key for it, both decimal numbers.

import math, random

def encode(text):
    hex_symbols = '0123456789abcdef'

    result = ''

    while text:
        char = text[0]
        num = str(ord(char))
        l = len(num)
        sq = math.sqrt(l)
        sq = round(sq*10)

        local_key = random.randint(1, 4)
        ciphered_sq = (sq-local_key) * local_key # so we always receive two-digit number

        loc_k = str(local_key) # to paste into cipher
        cip_sq = str(ciphered_sq) if ciphered_sq // 10 != 0 else '0' + str(ciphered_sq) # "09" if 9, not "9"
        result += loc_k + cip_sq + num

        text = text[1:]
    
    result = bin(int(result))[2:]
    key = result.index('0') # the main key
    result = result[key:]
    result = result.replace('1', '2')
    result = result.replace('0', '1')
    result = result.replace('2', '0')

    result = hex(int(result, 2))[2:]
    new_result = ''
    for char in result: # Caesar cipher
        ind = hex_symbols.index(char)
        ind += key
        new_result += hex_symbols[ind % 16]
    result = new_result

    key_fract = 0 # fractional part of a key
    while result[0] == '0':
        result = result[1:]
        key_fract += 1
    key_fract /= 10 ** (len(str(key_fract)))
    key += key_fract

    result = int(result, 16)

    return [str(result), key]


def decode(code, key):
    code = int(code)
    key = float(key)

    hex_symbols = '0123456789abcdef'

    result = ''

    print(key, type(key))
    key_int, key_fract = map(int, str(key).split('.'))

    code = hex(code)[2:]
    code = '0'*key_fract + code

    for char in code:
        ind = hex_symbols.index(char)
        ind -= key_int
        result += hex_symbols[int((ind+16) % 16)] # if key_int > ind
    
    result = bin(int(result, 16))[2:]
    result = result.replace('1', '2')
    result = result.replace('0', '1')
    result = result.replace('2', '0')
    result = '1'*key_int + result

    result = str(int(result, 2))
    new_result = ''
    while result:
        local_key = int(result[0])
        ciphered_sq = int(result[1:3])
        result = result[3:]

        sq = (ciphered_sq/local_key + local_key) / 10
        l = round(sq ** 2)

        num = int(result[:l])
        char = chr(num)
        new_result += char

        result = result[l:]
    result = new_result

    return result