import eel
from py_scripts.KruASe_Coder import encode, decode

@eel.expose
def encode_py(text:str):
    return encode(text)

@eel.expose
def decode_py(code:int, key:float):
    return decode(code, key)