#include "diff.h"
#include <windows.h>

int main(int argc, char** argv) {
    HANDLE hConsole = GetStdHandle(STD_OUTPUT_HANDLE);
    SetConsoleTextAttribute(hConsole, 15);
    std::string sentence;
    std::ifstream originalfile(argv[1]);
    std::vector<std::string> original;
    std::cout << argv[1] << ":";
    while (std::getline(originalfile, sentence)) {
        std::cout << sentence << '\n';
        original.push_back(sentence);
    }
    std::cout << '\n';
    std::ifstream newfile(argv[2]);
    std::vector<std::string> news;
    std::cout << argv[2] << ":";
    while (std::getline(newfile, sentence)) {
        std::cout << sentence << '\n';
        news.push_back(sentence);
    }
    std::cout << '\n';

    std::ofstream outputfile("LCS.txt");
    for(size_t i=0; i< original.size(); i++){
        /*std::vector<std::vector<int>> lcs = findLCS(original[i], news[i]);
        std::vector<char> inserted; std::vector<char> deleted;
        std::cout << "Case" << i << ": "<< backtrackLCS(original[i].length(), news[i].length(), original[i], news[i], lcs, inserted, deleted) << std::endl;
        for (size_t i = 0; i < inserted.size(); i++) {
            std::cout << "+" << inserted[i];
        }
        for (size_t i = 0; i < deleted.size(); i++) {
            std::cout << "-" << deleted[i];
        }*/

        //for array lines    
    }
    std::vector<std::string> store;
    std::vector<std::vector<int>> lcsArr = findLCSArray(original, news);
    returnStruct r1 = backtrackLCSArray(original.size(), news.size(), original, news, lcsArr, store);
    
    SetConsoleTextAttribute(hConsole, 4);
    std::cout << "Deleted:" << std::endl;
    for (size_t k = 0; k < r1.deleted.size(); k++) { std::cout << ">" << r1.deleted[k] << std::endl; }

    SetConsoleTextAttribute(hConsole, 2);
    std::cout << "Inserted:" << std::endl;
    for (size_t k = 0; k < r1.inserted.size(); k++) { std::cout << "<" << r1.inserted[k] << std::endl; }

    SetConsoleTextAttribute(hConsole, 15);
    std::cout << "Unchanged:" << std::endl;
    for (size_t k = 0; k < r1.LCS.size(); k++) { std::cout << r1.LCS[k] << std::endl; }
    
    outputfile.close();
    originalfile.close();
    newfile.close();

    
    // you can loop k higher to see more color choices
    /*for (int k = 1; k < 2; k++) {
        SetConsoleTextAttribute(hConsole, k);
        std::cout << k << " I want to be nice today!" << std::endl;
    }*/

    return 0;
}