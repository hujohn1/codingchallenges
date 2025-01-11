import math
from bitarray import bitarray

N = 1e5             #max bound on number of elements in bloom filter
EPSILON = 0.1       #false positive rate

M = -math.log(EPSILON)/math.log(2)**2 * N  #approximate number of bits in filter
K = M/N * math.log(2)                       #approximate number of hash functions

def xor_bytes(a: bytes, b: bytes)->bytes:
    for k in range(len(a)):
        c = (a & (1<<k)) ^ (b & (1<<k))
    return c

#Fowler-Noll-Vo hashing
def hash_fnv1a(string: str)->int:
    #arr = M * bitarray('0')
    byte_repr = string.encode(encoding='utf8')
    FNV_PRIME64 = 1099511628211     #64 bit uint
    hash = 14695981039346656037

    for b in byte_repr:
        hash = xor_bytes(hash.to_bytes(), b)
        hash = (hash * FNV_PRIME64) % len(str)
    return hash

def main():
    print(hash_fnv1a("arbitrstring"))

main()