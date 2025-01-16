import sys
import json
from . import pkg

def main():
    print(sys.path)
    print(add(5,2))
    print("hello world")
    collect(10, args=['milk', 'bob'])
    collect2(name="Johann", book="Monster")

# General format
# def f(pos1, pos2, /, pos_or_kwd, *, kwd1, kwd2):

#walrus operator x:=5, allows for evaluation and initialization at the same time


def collect(i: int, /,*,args)->None:
    '''
    takes in positional or keyword arguments and prints to console
    '''
    for a in args:
        print(a)
    print(i)
    
def collect2(**mangas):
    for a, b in mangas.items():
        print(a, b, end='')


if __name__=="__main__":
    main()