
// parser('the cat sat on the mat') -> the 1, cat 2 etc...
function parseIndex(str, pageIndex = 1) {
    let word = ''
    let wordIndex = 0
    const wordMaps = []
    
    for (let currIndex = 0; currIndex < str.length; currIndex++) {
        const currChar = str[currIndex]
        if (currChar === ' ') {
            const wordIndexInfo = [pageIndex, ++wordIndex]
            const oldWordIndex = wordMaps.find(([oldWord]) => word === oldWord)
            if (oldWordIndex) {
                oldWordIndex.push(wordIndexInfo)
            } else {
                wordMaps.push([word, wordIndexInfo])
            }
            word = ''
            continue
        }

        if (currIndex === (str.length - 1)) {
            const wordIndexInfo = [pageIndex, ++wordIndex]
            const oldWordIndex = wordMaps.find(([oldWord]) => word === oldWord)
            if (oldWordIndex) {
                oldWordIndex.push(wordIndexInfo)
            } else {
                wordMaps.push([word + currChar, wordIndexInfo])
            }
        }

        word += currChar
    }

    return wordMaps
}

/* 
concatIndex(
    [[ 'the', [ 1, 1 ], [ 1, 5 ] ]],
    [[ 'the', [ 2, 1 ], [ 2, 5 ] ], ['cat', [1, 2]]],
    [[ 'dog', [ 2, 2 ]]]
) -> [
    ['the', [1, 1], [1, 5], [2, 1], [2, 5]], 
    ['cat', [1, 2]], 
    ['dog', [2,2]]
]
 */
function concatIndex(first, second, ...rest) {
    if (first.length < second.length) {
        return concatIndex(second, first)
    }

    const hasConcated = new Set()

    for (let i = 0; i < first.length; i++) {
        const indexInFirst = first[i]
        const word = indexInFirst[0]
        let indexInSecond

        for (let j = 0; j < second.length; j++) {
            if (hasConcated.has(j)) continue
            if (second[j][0] === word) {
                indexInSecond = second[j]
                hasConcated.add(j)
            }
        }

         
        if (indexInSecond) {
            indexInFirst.push(...indexInSecond.slice(1))
        }
    }

    for (let i = 0; i < second.length; i++) {
        if (hasConcated.has(i)) continue
        first.push(second[i])
    }

    if (rest.length) {
        return concatIndex(first, rest[0], ...rest.slice(1))
    }

    return first
}

const pageOne = parseIndex('the cat sat on the mat', 1)
const pageTwo = parseIndex('the dog stood on the mat', 2)
const pageThree = parseIndex('the cat stood while a dog sat', 3)
const pageIndexes = concatIndex(pageOne, pageTwo, pageThree)

// searchIndex('cat sat', pageIndexes) -> [1]
function searchIndex(searchStr, indexes) {
    // [['cat', []]]
    const result = []
    const searchArr = searchStr.trim().split(' ')
    let prevIndexes = null
    for (const str of searchArr) {
        const foundIndex = indexes.find(index => index[0] === str)
        // if (foundIndex &&  )
    }
}