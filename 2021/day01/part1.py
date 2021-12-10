def parse(path):

    with open(path, 'r') as f:
        return list(map(int, f.read().splitlines()))


def solve(input):

    count = 0
    i = 1

    while i < len(input):
        if input[i] > input[i-1]:
            count += 1
        i += 1

    return count


print(solve(parse('test1.txt')))
print(solve(parse('input1.txt')))