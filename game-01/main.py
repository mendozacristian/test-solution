def getArrayTwoCandidates(A, sum):
    """
    Get Array Two Candidates.

    Args:
        A (Array):
        sum (int):
    """
    h = set() # Create an empty hash set
    
    # Iterate over the array and find the rest between the sum and item
    for i in range(0, len(A)):
        comp = sum-A[i] # 'comp' is the rest o complement 
        if comp in h:
            # return two candidates in array
            return [comp,A[i]]
        h.add(A[i])

    # return a response alternative in string
    return "Array M doesn't have 2 elements with the given sum N"
 
# Test data
M = [2, 5, 8, 14, 0] # Array of integer numbers
N = 10 # Integer number

# Print result from calling function 'getArrayTwoCandidates'
print(getArrayTwoCandidates(M, N))