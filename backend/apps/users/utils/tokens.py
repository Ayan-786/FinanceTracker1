import os
import binascii
import random
import string


def generate():
    return binascii.hexlify(os.urandom(20)).decode()


def random_id():
    letters = ''.join(random.choice(string.ascii_uppercase) for i in range(3))
    random_text = str(random.randint(100000, 999999))
    return letters+random_text
