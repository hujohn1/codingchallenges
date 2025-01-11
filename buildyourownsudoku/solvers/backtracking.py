grid = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [1, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
]


def is_valid(r, c, k):
    is_rowvalid = all(grid[r][x] != k for x in range(0, 9))
    is_colvalid = all(grid[x][c] != k for x in range(0, 9))
    is_squarevalid = all(grid[x][y] != k for x in range(r//3*3, r//3*3+3) for y in range(c//3*3, c//3*3+3))
    return (is_rowvalid and is_colvalid and is_squarevalid)

def all_is_valid():
    # check that all squares are valid (9 squares)
    all_square_valid = all(len(set(grid[x][y] for x in range(r, r+3) for y in range(c, c+3))) == 9
        for r in range(0, 9, 3)
        for c in range(0, 9, 3))
    # check that all rows are valid (9 rows)
    all_row_valid = all(len(set(grid[r])) == 9 
        for r in range(9))
    # check that all cols are valid (9 cols)
    all_col_valid = all(len(set(grid[r][c]
        for r in range(9))) == 9 
        for c in range(9))

    return (all_square_valid and all_row_valid and all_col_valid)

import os
dir = os.getcwd()


def solve(r=0, c=0):
    if(c==9):
        return solve(r+1, 0)
    elif(r==9):
        return True
    elif(grid[r][c]!=0):
        return solve(r, c+1)
    else:
        for k in range(1, 10):
            if is_valid(r, c, k):
                grid[r][c] = k
                if solve(r, c+1):
                    return True
                grid[r][c] = 0
        return False

if solve():
    for row in grid:
        print(row)

b = all_is_valid()
print(b)