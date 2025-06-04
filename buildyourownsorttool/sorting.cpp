#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <set>
#include <cstring>
#include <cmath>
using namespace std;

//perform all sorting using reference

#ifndef MERGESORT
void merge(std::vector<string>& arr, int start, int midpoint, int end){
    std::vector<string> tmp; 
    int ptr1 = start; 
    int ptr2 = midpoint +1; 

    while(ptr1 <= midpoint && ptr2 <= end){
        if(arr[ptr1] <= arr[ptr2]){
            tmp.push_back(arr[ptr1]);
            ptr1++; 
        }
        else{
            tmp.push_back(arr[ptr2]);
            ptr2++; 
        }
    }
    while(ptr1 <= midpoint){
        tmp.push_back(arr[ptr1]);
        ptr1++; 
    }
    while(ptr2 <= end){
        tmp.push_back(arr[ptr2]);
        ptr2++; 
    }
    for(int i=start; i<=end; i++){
        arr[i]=tmp[i-start];
    }
}
void mergesort(std::vector<string>& arr, int start, int end){
    if(start < end){
        int midpoint = floor((start+end)/2);
        mergesort(arr, start, midpoint);
        mergesort(arr, midpoint+1, end);
        merge(arr, start, midpoint, end);
    }
}
#endif

#ifndef HEAPSORT
void heapify(std::vector<string>& arr, int size, int subtree_idx){
    int left = 2*subtree_idx+1;
    int right = 2*subtree_idx+2; 
    int largest = subtree_idx;
    if(left < size && arr[left] >= arr[largest]){
        largest = left;
    }
    if(right <= size && arr[right] >= arr[largest]){
        largest = right;
    }
    if(largest != subtree_idx){
        string tmp = arr[largest]; arr[largest]=arr[subtree_idx]; arr[subtree_idx]=tmp;
        heapify(arr, size, largest);
    }
}
void buildTree(std::vector<string>&arr){
    int last_internal = arr.size()/2-1;
    for(int idx=last_internal; idx>=0; idx-=1){
        heapify(arr, arr.size(), idx);
    }
    for(int idx=arr.size()-1; idx>=0; idx--){
        string tmp = arr[0]; arr[0]=arr[idx]; arr[idx]=tmp;
        heapify(arr, idx, 0);
    }
    for(int i=0; i<arr.size(); i++){
        cout << arr[i] << '\n';
    }
}
#endif


#ifndef QUICKSORT
int partition(std::vector<string>& arr, int p, int r){
    string pivot = arr[r];
    int i = p-1;
    for(int j=p; j<r; j++){
        if(arr[j]<=pivot){
            i++; string tmp = arr[i]; arr[i]=arr[j]; arr[j]=tmp;
        }
    }
    string tmp = arr[i+1]; arr[i+1]=arr[r]; arr[r]=tmp;
    return i+1;
}
void quicksort(std::vector<string>& arr, int p, int r){
    //cout << "quicksort" << "(" << p << "," << r << ")";
    int q; 
    if(p < r){
        q = partition(arr, p, r);
        quicksort(arr, p, q-1);
        quicksort(arr, q+1, r);
    }
}
#endif


int main(int argc, char** argv){
    ifstream myfile;
    char* flag = argv[1];
    char* sortmethod = argv[3];
    char* filename = argv[2]; 
    myfile.open(filename);
    string line;

    if(strcmp(flag, "-u")==0){
        set<string> wordset; 
        while(getline(myfile, line)){
            wordset.insert(line);
        }
        for(auto w: wordset){
            cout << w << std::endl;
        }
    }
    else{
        vector<string> words; 
        while(getline(myfile, line)){
            words.push_back(line);
        }
        if(strcmp(sortmethod, "--heap")==0){
            buildTree(words);
        }
        else if(strcmp(sortmethod, "--quick")==0){
            quicksort(words, 1, words.size());
        }
        else if(strcmp(sortmethod, "--merge")==0){
            mergesort(words, 0, words.size()-1);
        }
        for(auto w: words){
            cout << w << std::endl;
        }
    }
    return 0;
}
