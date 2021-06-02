local duofu_80_mini = 800000
local duofu_80_minor = 2000000
local duofu_80_major = 4000000
local duofu_180_mini = 1800000
local duofu_180_minor = 4500000
local duofu_180_major = 9000000
local duofu_380_mini = 3800000
local duofu_380_minor = 9500000
local duofu_380_major = 19000000
local duofu_680_mini = 6800000
local duofu_680_minor = 17000000
local duofu_680_major = 34000000
local duofu_880_mini = 8800000
local duofu_880_minor = 22000000
local duofu_880_major = 44000000
local duofu_1760_mini = 17600000
local duofu_1760_minor = 44000000
local duofu_1760_major = 88000000
local duofu_17600_mini = 176000000
local duofu_17600_minor = 440000000
local duofu_17600_major = 880000000
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
gg.setRanges(gg.REGION_JAVA_HEAP | gg.REGION_C_HEAP | gg.REGION_C_ALLOC | gg.REGION_C_DATA | gg.REGION_C_BSS |
                 gg.REGION_PPSSPP | gg.REGION_ANONYMOUS | gg.REGION_JAVA | gg.REGION_STACK | gg.REGION_ASHMEM |
                 gg.REGION_OTHER | gg.REGION_BAD | gg.REGION_CODE_APP | gg.REGION_CODE_SYS)
--[=====[

--]=====]

function tweak(min, max)
    gg.clearResults()
    gg.searchNumber(min, gg.TYPE_AUTO, false, gg.SIGN_EQUAL, 0, -1, 0)
    gg.processResume()
    -- gg.timeJump("1:1:0")
    --[=====[
    gg.searchFuzzy("0", gg.SIGN_FUZZY_EQUAL,
        gg.TYPE_DWORD | gg.TYPE_XOR | gg.TYPE_FLOAT | gg.TYPE_QWORD | gg.TYPE_DOUBLE, 0, -1, 0)
    --]=====]
    revert = gg.getResults(500, nil, nil, nil, nil, nil, nil, nil, nil)
    gg.editAll(max, gg.TYPE_DWORD)
end

local minis = {dragon_100_mini, dragon_500_mini, dragon_1000_mini, dragon_200_mini, dragon_2000_mini}
local majors = {dragon_100_major, dragon_500_major, dragon_1000_major, dragon_200_major, dragon_2000_major}
local minors = {dragon_100_minor, dragon_500_minor, dragon_1000_minor, dragon_200_minor, dragon_2000_minor}

for k, v in pairs(minis) do
    tweak(v, dragon_10000_mini)
end

for k, v in pairs(majors) do
    tweak(v, dragon_10000_major)
end

for k, v in pairs(minors) do
    tweak(v, dragon_10000_minor)
end

--[=====[

--]=====]

