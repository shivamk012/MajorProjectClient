//hex code for different colors
const green = '#3CB043';
const red = '#FF0000';
const yellow = '#FFFF00';
const orange = '#FFA500';

const getSum = (arr) => {
    let n = arr.length; // 120
    let m = arr[0].length; // 6
    let sum = new Array(0,0,0); // CO , CO2 , NH4
    let sum2 = 0 // 6
    for(let i=0 ; i<n ; ++i){
        for(let j=0 ; j < m ; ++j){
            sum[i] += (i&1 === 1 ? 0 : arr[i][j]); 
            sum2 += arr[i][j];
        }
    }   
    return {sum , sum2};
}

function getFlag(distance1 , distance2){
    let distDif = Math.abs(distance1 - distance2); 
    if(distDif > 1000){
        return true;
    }
    return false;
}

const calculateProbability = (concentration , sum)=>{
    let probabilityPath = [0 , 0 , 0]; 
    for(let i=0 ; i<3 ; i += 1){
        probabilityPath[i] = ((concentration[i] * 1.0) / (sum * 1.0));
    }
    return probabilityPath;
}

const entropy = (probability , concentration) => {
    let maxEntropy = -1e9;
    let n = probability.length;
    for(let i=0 ; i < n ; i += 1){
        maxEntropy = Math.max(maxEntropy , (probability[i] * Math.log2(concentration[i]) ));    
    }
    return maxEntropy;
}

const calculteCriteria = (path1 , path2 , changeColor) => {
    let objPath1 = getSum(path1[1]);
    let sumPath1 = objPath1.sum; // CO , CO2 , NH4
    let sumAllPath1 = objPath1.sum2;
    let objPath2 = getSum(path2[1]); // CO , CO2 , NH4
    let sumPath2 = objPath2.sum;
    let sumAllPath2 = objPath2.sum2;
    let flag = getFlag(path1[0] , path2[0]);
    if(flag){ 
        // smaller path -> green , longer path -> red
        if(path1[0] <= path2[0]) changeColor(green , red);
        else changeColor(red, green);
    }
    else{
        let concentrationPath1 = [path1[1][0] , path1[1][2] , path1[1][4]];
        let concentrationPath2 = [path2[1][0] , path2[1][2] , path2[1][4]];
        let probabilityPath1 = calculateProbability(concentrationPath1);
        let probabilityPath2 = calculateProbability(concentrationPath2);
        let selectedPollutantPath1 = entropy(probabilityPath1 , concentrationPath1);
        let selectedPollutantPath2 = entropy(probabilityPath2 , concentrationPath2);
        if(selectedPollutantPath1 <= selectedPollutantPath2) {
            // path1 -> yellow , path2 -> orange
            changeColor(yellow , orange);
        }
        else if(selectedPollutantPath1 <= selectedPollutantPath2) {
            // path2 -> yellow , path1 -> orange
            changeColor(orange , yellow);
        }
    }
}

export default calculteCriteria;