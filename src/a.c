#include <stdio.h>

int main() {
    int score;
    scanf("%d", &score);
    if(score < 0 || score > 100){
        printf("Invalid score");
        return 0;
    }
    switch(score = (score == 100) ? 10 : score / 10){
        case 10:
        case 9:
        printf("A\n");
        break;
        case 8:
        printf("B\n");
        break;
        case 7:
        printf("C\n");
        break;
        case 6:
        printf("D\n");
        break;
        default:
        printf("F\n");
        break;
    };
    printf("%s",(score < 6) ? "Status: Failed" : "Status: Passed");
    return 0;
}