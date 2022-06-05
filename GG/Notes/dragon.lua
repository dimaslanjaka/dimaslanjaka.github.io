function tweak(min, max)
    gg.clearResults()
    gg.searchNumber(min, gg.TYPE_AUTO, false, gg.SIGN_EQUAL, 0, -1, 0)
    gg.processResume()
    gg.processResume()
    revert = gg.getResults(500, nil, nil, nil, nil, nil, nil, nil, nil)
    gg.editAll(max, gg.TYPE_DWORD)
    gg.refineNumber(min, gg.TYPE_AUTO, false, gg.SIGN_EQUAL, 0, -1, 0)
    revert = gg.getResults(500, nil, nil, nil, nil, nil, nil, nil, nil)
    gg.editAll(max, gg.TYPE_XOR)
end

local dragon_100_mini = 800000
local dragon_100_major = 4000000
local dragon_100_minor = 2000000
local dragon_200_mini = 1800000
local dragon_200_major = 8000000
local dragon_200_minor = 4000000
local dragon_500_mini = 4000000
local dragon_500_major = 20000000
local dragon_500_minor = 10000000
local dragon_1000_mini = 8000000
local dragon_1000_major = 40000000
local dragon_1000_minor = 20000000
local dragon_2000_mini = 16000000
local dragon_2000_major = 80000000
local dragon_2000_minor = 40000000
local dragon_10000_mini = 80000000
local dragon_10000_major = 400000000
local dragon_10000_minor = 200000000

gg.setVisible(false)
gg.setSpeed(2.0)
-- gg.timeJump("1:1:0")
gg.setRanges(gg.REGION_JAVA_HEAP | gg.REGION_C_HEAP | gg.REGION_C_ALLOC | gg.REGION_C_DATA | gg.REGION_C_BSS |
                 gg.REGION_PPSSPP | gg.REGION_ANONYMOUS | gg.REGION_JAVA | gg.REGION_STACK | gg.REGION_ASHMEM |
                 gg.REGION_OTHER | gg.REGION_BAD | gg.REGION_CODE_APP | gg.REGION_CODE_SYS)

while true do
    tweak(dragon_100_major, dragon_10000_major)
    tweak(dragon_200_major, dragon_10000_major)
    tweak(dragon_500_major, dragon_10000_major)
    tweak(dragon_1000_major, dragon_10000_major)
    tweak(dragon_2000_major, dragon_10000_major)

    tweak(dragon_100_mini, dragon_10000_mini)
    tweak(dragon_200_mini, dragon_10000_mini)
    tweak(dragon_500_mini, dragon_10000_mini)
    tweak(dragon_1000_mini, dragon_10000_mini)
    tweak(dragon_2000_mini, dragon_10000_mini)

    tweak(dragon_100_minor, dragon_10000_minor)
    tweak(dragon_200_minor, dragon_10000_minor)
    tweak(dragon_500_minor, dragon_10000_minor)
    tweak(dragon_1000_minor, dragon_10000_minor)
    tweak(dragon_2000_minor, dragon_10000_minor)

    tweak(100000, 10000000)
    tweak(10000, 1000000)
    tweak(200000, 2000000)
end
