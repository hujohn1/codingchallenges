import argparse, re
from collections import deque

operations = {"*": 2, "/": 2, "+": 1, "-": 1}
associativity = {"^": 'R', "*": 'L', "/": 'L', "+": 'L', "-": 'L'}

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


def operate(a, b, operand):
    if operand =="*":
        return a*b
    elif operand == "/":
        return a/b
    elif operand == "+":
        return a+b
    elif operand == "-":
        return a-b


def multiply(x: int, y:int):
    #multiplication along with karatsuba
    return x*y


def get_prefix(s: str)->str:
    '''infix to prefix
    '''
    x = re.findall(r"\d+\.\d+|\d+|[+\-/\*()]", s)
    length = len(x)
    map = {"(": ")", ")": "("}
    y  = [x[length-1-i] if x[length-1-i] not in map else map[x[length-1-i]] for i in range(length)]
    stk, out  = deque(), deque()
    for token in y:
        if(convert_int(token) or convert_float(token)):
            out.append(token)

        elif(token in operations.keys()):
            while(len(stk) > 0 and stk[-1] != "(" and operations.get(stk[-1]) > operations.get(token)):
                out.append(stk.pop())
            stk.append(token)

        elif(token =="("):
            stk.append(token)

        elif(token == ")"):
            while(len(stk) > 0 and stk[-1] != "("):
                out.append(stk.pop())
            stk.pop()
    while(len(stk) > 0):
        out.append(stk.pop())
    return ' '.join(out)[::-1]
    

def get_postfix(s: str)->str:
    '''infix to postfix
    '''
    #implemented from wikipedia definition
    stk, out  = deque(), deque()
    x = re.findall(r"\d+\.\d+|\d+|[+\-/\*()]", s)
    for token in x:
        if(convert_int(token) or convert_float(token)):
            out.append(token)

        elif(token in operations.keys()):
            while(len(stk) > 0 and stk[-1] != "(" and operations.get(stk[-1]) >= operations.get(token)):
                out.append(stk.pop())
            stk.append(token)
        elif(token =="("):
            stk.append(token)
        elif(token == ")"):
            while(len(stk) > 0 and stk[-1] != "("):
                out.append(stk.pop())
            stk.pop()
    while(len(stk) > 0):
        out.append(stk.pop())
    return ' '.join(out)

def evaluate_postfix(s: str):
    evalstack = deque()
    x = re.findall(r"\d+\.\d+|\d+|[+\-/\*()]", s)
    result = 0
    for s in x:
        if(convert_int(s) or convert_float(s)):
            evalstack.append(s)
        if s in operations and len(evalstack)>=2:
            right = evalstack[-1]
            left = evalstack[-2]
            result = operate(float(left), float(right),s)
            evalstack.pop()
            evalstack.pop()
            evalstack.append(result)
    return result

def evaluate_prefix(s: str):
    evalstack = deque()
    x = re.findall(r"\d+\.\d+|\d+|[+\-/\*()]", s)
    result = 0
    for s in reversed(x):
        if(convert_int(s) or convert_float(s)):
            evalstack.append(s)
        if s in operations and len(evalstack) >=2 :
            right = evalstack[-1]
            left = evalstack[-2]
            result = operate(float(right), float(left),s)
            evalstack.pop()
            evalstack.pop()
            evalstack.append(result)
    return result
            
def main():
    parser = argparse.ArgumentParser(
                    description="Supports basic arithmetic operations on ints/floats/complex")
    parser.add_argument('-in', '--input', required = True)
    args = parser.parse_args()
    print(evaluate_postfix(get_postfix(args.input)))
    

if __name__=="__main__":
    main()
