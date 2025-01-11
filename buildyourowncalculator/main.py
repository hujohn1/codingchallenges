import argparse, re
from collections import deque

def convert_float(s: str):
    try:
        float(s)
        return True
    except ValueError:
        return False
    
def convert_int(s: str):
    try:
        int(s)
        return True
    except ValueError:
        return False

def add(x, y):
    return x+y

def multiply(x: int, y:int):
    #multiplication along with karatsuba
    return x*y

def get_postfix(s: str)->str:
    #implemented from wikipedia definition
    operations = {"*": 1, "/": 1, "+": 2, "-": 2}
    associativity = {"^": 'R', "*": 'L', "/": 'L', "+": 'L', "-": 'L'}
    stk = deque()
    out = deque()
    x = re.findall(r"\d+\.\d+|\d+|[+\-/\*()]", s)
    for token in x:
        if(convert_int(token) or convert_float(token)):
            out.append(token)

        if(token in operations.keys):
            #add elements to queue from left: FIFO
            #add elements to stack from right and pop from left: LIFO
            while(not len(stk)==0 and stk[-1]!="(" and operations.get(stk[-1])>operations.get(token)):
                out.appendleft(stk.popleft())
            stk.append(token)
        elif(token =="("):
            stk.append(token)
        elif(token == ")"):
            while(len(stk)>0 and stk[-1]!="("):
                out.appendleft(stk.popleft())
            stk.popleft()
        while(len(stk)>0):
            stk.popleft()

def get_prefix(s: str)->str:
    pass

def main():
    parser = argparse.ArgumentParser(
                    description="Supports basic arithmetic operations on ints/floats/complex")
    parser.add_argument('-in', '--input', required = True)
    args = parser.parse_args()
    get_postfix(args.input)

if __name__=="__main__":
    main()