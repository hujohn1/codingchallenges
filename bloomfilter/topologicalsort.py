import sys
from collections import (deque, defaultdict)

def main():
    adjList = defaultdict(list)
    indegrees=defaultdict(int)

    nodelist = []
    nodes = list(map(int, sys.stdin.readline().split()))
    for n in nodes:
        nodelist.append(n)

    m = int(sys.stdin.readline())
    for _ in range(m):
        entry = list(map(int, sys.stdin.readline().split()))
        adjList[entry[0]].append(entry[1])
        indegrees[entry[1]]+=1
    
    topologicalsort(nodelist, adjList, indegrees)
        
def topologicalsort(nodelist: list[int], adjList: dict[int, int] , indegrees: list[int])->list[int]:
    '''use kahns algorithm'''
    q = deque([s for s in nodelist if not indegrees[s]])
    results = []
    while(q):
        top = q.popleft()
        results.append(top)
        for neighbor in adjList[top]:
            indegrees[neighbor]-=1
            if not indegrees[neighbor]:
                q.append(neighbor)
    
    if(len(results)!=len(nodelist)):
        print("There is a cycle")
    else:
        for i in results:
            print(f"{i},", end=" ")

if __name__ =="__main__":
    main()