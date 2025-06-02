#pragma once
#include <stdio.h>
#include <string>
#include <vector>
#include <iostream>
#include <fstream>
#include <algorithm>

struct returnStruct {
    std::vector < std::string> inserted;
    std::vector <std::string> deleted;
    std::vector <std::string> LCS;
};

//LCS for two strings
std::vector<std::vector<int>> findLCS(const std::string& str1, const std::string& str2);
std::string backtrackLCS(int i, int j, const std::string& str1, const std::string& str2, std::vector<std::vector<int>> dp, std::vector<char>& inserted, std::vector<char>& deleted);

//LCS for two arrays
std::vector<std::vector<int>> findLCSArray(const std::vector<std::string>& arr1, const std::vector<std::string>& arr2);
returnStruct backtrackLCSArray(int i, int j, const std::vector<std::string>& arr1, const std::vector<std::string>& arr2, std::vector<std::vector<int>> dp, std::vector<std::string>& lcs);