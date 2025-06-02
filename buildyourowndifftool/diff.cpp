#include "diff.h"

std::vector<std::vector<int>> findLCS(const std::string& str1, const std::string& str2) {
    int m = str1.length(); int n = str2.length();
    std::vector<std::vector<int>> dp(m + 1, std::vector<int>(n + 1, 0));
    for (int i = 0; i <= m; i++) {
        dp[i][0] = 0;
    }
    for (int j = 0; j <= n; j++) {
        dp[0][j] = 0;
    }
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (str1[i - 1] == str2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            }
            else {
                dp[i][j] = std::max(dp[i][j - 1], dp[i - 1][j]);
            }
        }
    }
    return dp;
}
std::string backtrackLCS(int i, int j, const std::string& str1, const std::string& str2, std::vector<std::vector<int>> dp, std::vector<char>& inserted, std::vector<char>& deleted) {
    int m = str1.length(); int n = str2.length();
    //std::cout << "backtrackLCS(" << i << "," << j << ")";
    if (i == 0 || j == 0) {
        return "";
    }
    if (str1[i - 1] == str2[j - 1]) {
        return backtrackLCS(i - 1, j - 1, str1, str2, dp, inserted, deleted) + str1[i - 1];
    }
    else if (dp[i - 1][j] > dp[i][j - 1]) {
        deleted.push_back(str1[i-1]);
        return backtrackLCS(i - 1, j, str1, str2, dp, inserted, deleted);
    }
    else {
        inserted.push_back(str2[j-1]); 
        return backtrackLCS(i, j - 1, str1, str2, dp, inserted, deleted);
    }
}

std::vector<std::vector<int>> findLCSArray(const std::vector<std::string>& arr1, const std::vector<std::string>& arr2) {
    int m = arr1.size(); int n = arr2.size();
    std::vector<std::vector<int>> dp(m + 1, std::vector<int>(n + 1, 0));
    for (int i = 0; i <= m; i++) {
        dp[i][0] = 0;
    }
    for (int j = 0; j <= n; j++) {
        dp[0][j] = 0;
    }
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (arr1[i - 1] == arr2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            }
            else {
                dp[i][j] = std::max(dp[i][j - 1], dp[i - 1][j]);
            }
        }
    }
    return dp;
}
returnStruct backtrackLCSArray(int i, int j, const std::vector<std::string>& arr1, const std::vector<std::string>& arr2, std::vector<std::vector<int>> dp, std::vector<std::string>& LCS) {
    std::vector<std::string> LCS_seq; 
    std::vector<std::string> inserted; 
    std::vector<std::string> deleted;
    while (i > 0 && j > 0) {
        //std::cout << "(" << i << "," << j << ")" << '\n';
        if (arr1[i - 1] == arr2[j - 1]) {
            LCS_seq.push_back(arr1[i-1]);
            i--;
            j--;
        }
        else if (dp[i - 1][j] > dp[i][j - 1]) {
            inserted.push_back(arr1[i - 1]);
            i--;
        }
        else {
            deleted.push_back(arr2[j - 1]);
            j--;
        }
    }
    while (i > 0) {
        inserted.push_back(arr1[i - 1]);
        i--;
    }
    while (j > 0) {
        deleted.push_back(arr2[j - 1]);
        j--;
    }
    std::reverse(LCS_seq.begin(), LCS_seq.end());
    std::reverse(inserted.begin(), inserted.end());
    std::reverse(deleted.begin(), deleted.end());

    returnStruct r1 = { LCS_seq, inserted, deleted };
    return r1;
}
