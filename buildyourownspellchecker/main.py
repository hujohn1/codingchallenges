import os
import math
import argparse
import random
from bitstring import BitArray

#Insert items by applying the hash functions and setting the corresponding bits to one.
#Query for the presence of an item by applying the hash functions. 
#If any of the corresponding bits are zero, the item is definitely not in the set. 
#If all of the bits are one, the item is probably in the set.

# constants
EPSILON = 1e-2
OFFSET_BASIS = {32: "0x811C9DC5", 64: "0xCBF29CE484222325"}
FNV_PRIMES = {32: "0x01000193", 64:  "0x100000001B3"}

# lambdas
calculatebits = lambda n, fprate: -1*n*math.log(fprate)/math.log(2)**2
calculatehashfs = lambda fprate: -1*math.log(fprate)/math.log(2)

class BloomFilter:
    def __init__(self, m, k):
        self.m = int(m)
        self.k = int(k)
        self.bitarr = [0] * self.m
        self.hashfs = []
    
    def add_word(self, s: str):
        for i in range(self.k):
            id = hash_fnv1a64(s,i) % self.m
            self.hashfs.append(id)
            self.bitarr[id]=1
    
    def contains_word(self, s: str)->bool:
        for i in range(self.k):
            id = hash_fnv1a64(s, i) % self.m
            if(self.bitarr[id]==0):
                return False
        return True
    
def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('filename', type = str, help = 'filename of dictionary', default='dict.txt')
    #parser.print_help()
    args = parser.parse_args()
    folderdir = os.path.dirname(os.path.abspath('main.py'))
    s = os.path.join(folderdir, f"{args.filename}")
    linecnt = 0
    with open(s, "r") as f:
        lines = f.readlines()
        for _ in lines:
            linecnt+=1
    
    m = calculatebits(linecnt, EPSILON)
    k = calculatehashfs(EPSILON)
    print(f"{math.ceil(m)} bit array, {math.ceil(k)} hash functions")

    bf = BloomFilter(m, k)  

    for line in lines:
        bf.add_word(line.strip())

    #print(bf.contains_word("aardvarke"))
    #print(bf.contains_word("aardwolf"))
    #print(bf.contains_word("bobby"))    
    print(f"Original file size: {os.path.getsize(s)} bytes")
    
     

        
def hash_fnv1a64(s: str, rand: int)->int:
    hash = int(OFFSET_BASIS[64], 16)+rand
    uint64_max = 1 << 64
    for ch in s:
        hash = (hash^ord(ch))
        hash *= int(FNV_PRIMES[64], 16)
        hash = hash % uint64_max
    return hash


if __name__=="__main__":
    main()
