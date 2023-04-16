//hex code for different colors
const green = '#3CB043';
const red = '#FF0000';
const yellow = '#FFFF00';
const orange = '#FFA500';

function getFlag(distance1 , distance2){
    let distDif = Math.abs(distance1 - distance2); 
    if(distDif > 1000){
        return true;
    }
    return false;
}

const calculateProbability = (decisionMatrix)=>{
    let probabilityPath = []; 
    for(let i=0 ; i<120 ; i+=1){
        let newArr = [0 , 0 , 0];
        probabilityPath.push(newArr);
    }

    // console.log(decisionMatrix);
    // 0 -> CO , 2 -> CO2 , 4 -> NH4
    
    let sum = [0 , 0 , 0];
    //calculate sum of CO , CO2 , NH4
    for(let j = 0 ; j < 3 ; j += 1){
        for(let i=0 ; i < 120 ; i += 1){
            sum[j] += decisionMatrix[i][j*2];
        }
    }

    //calculate probability
    for(let j=0 ; j < 3 ; j += 1){
        for(let i=0 ; i < 120 ; i += 1){
            let curProb = ((decisionMatrix[i][j*2] * 1.0) / (sum[j] * 1.0));
            probabilityPath[i][j] = curProb;
        }
    }
    return probabilityPath;
}

const calculateEntropy = (probabilityPath) => {
    let n = probabilityPath.length;
    let E = [0 , 0 , 0]; // store entropies of each pollutant
    
    //calculating entropy
    for(let j=0 ; j<3 ; j+=1){
        let sum = 0;
        for(let i=0 ; i<120 ; i+=1){
            sum += probabilityPath[i][j] * Math.log(probabilityPath[i][j]); // p * ln(p)
        }
        E[j] = ((sum * -1.0) / (Math.log(n))); // E[j] = p[i][j] * ln(p[i][j]) / ln(n) where i tends to 0 to m and j tends to 0 to n
        // where m is equal to no of minutes(here 120) and n is equal to no of pollutants(here 3)
    }
    return E;
}

const calculateWeight = (entropy) => {
    let W = [0 , 0 ,0]; //store objective weights
    let dispersion = [1-entropy[0] , 1-entropy[1] , 1-entropy[2]]; // store degree of dispersion 
    // dispersion = 1 - entropy 

    for(let i=0 ; i<3 ; i+=1){
        W[i] = ((dispersion[i] * 1.0)/((dispersion[0] + dispersion[1] + dispersion[2]) * 1.0)); 
    }
    return W;
}

const calculteCriteria = (path1 , path2 , changeColor) => {
    let flag = getFlag(path1[0] , path2[0]);
    if(flag){ 
        // smaller path -> green , longer path -> red
        console.log(0);
        if(path1[0] <= path2[0]) changeColor(green , red);
        else changeColor(red, green);
    }
    else{
        let probabilityPath1 = calculateProbability(path1[1]);
        let probabilityPath2 = calculateProbability(path2[1]);
        // console.log(probabilityPath1);
        // console.log(probabilityPath2);
        let entropyPath1 = calculateEntropy(probabilityPath1);
        let entropyPath2 = calculateEntropy(probabilityPath2);
        // console.log(entropyPath1);
        // console.log(entropyPath2);
        let weightPath1 = calculateWeight(entropyPath1);
        let weightPath2 = calculateWeight(entropyPath2);
        // console.log(weightPath1);
        // console.log(weightPath2);
        let selectedParameterPath1 = Math.max(weightPath1[0] , weightPath1[1] , weightPath1[2]); 
        let selectedParameterPath2 = Math.max(weightPath2[0] , weightPath2[1] , weightPath2[2]); 
        
        if(selectedParameterPath1 <= selectedParameterPath2){
            changeColor(yellow , orange);
        }
        else{
            changeColor(orange , yellow);
        }
    }
}

export default calculteCriteria;