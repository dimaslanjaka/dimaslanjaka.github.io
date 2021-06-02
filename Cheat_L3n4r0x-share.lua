--[[
  REVENGE FOR PUBG 0.8.1
  BY L3N4R0X (DL)
  - Auto Select Memory Ranges
  Perfect systematic data binaries
--]]

print("REVENGE FOR PUBG: 0.8.1 ▎🔷 L3n4r0x")

gg.setRanges(gg.REGION_C_ALLOC | gg.REGION_ANONYMOUS | gg.REGION_CODE_APP) 
gg.getResults(5000)

-- options
local scriptName = "[=====[Script for PUBG MOBILE 0.8.0]=====]"
local scriptVersion = '1.0.0'
local scriptAuthor = 'User'
local startToast = ""
-- 0 - no check; 1 - check package only, 2 - check package and build
local checkTarget = 0

local targetName = "[=====[PUBG MOBILE]=====]"
local targetPkg = 'com.tencent.ig'
local targetVersion = "[=====[0.8.0]=====]"
local targetBuild = 9345

-- functions

-- init
-- gg.require('8.65.0', 12282)

if startToast ~= "" then startToast = '\n'..startToast end
gg.toast(scriptName..' v'..scriptVersion..' by '..scriptAuthor..startToast)

if checkTarget ~= 0 then
	local info = gg.getTargetInfo()
	local check = false
	local current = false
	if checkTarget >= 1 then
		check = targetPkg
		current = info.packageName
	end
	if checkTarget >= 2 then
		check = check..' '..targetVersion..' ('..targetBuild..')'
		current = current..' '..info.versionName..' ('..info.versionCode..')'
	end
	if check ~= current then
		gg.alert('This script for "'..targetName..'" ['..check..'].\nYou select "'..info.label..'" ['..current..'].\nNow script exit.')
		os.exit()
	end
end

--[[ DIR EXT BETA

gg.EXT_CACHE_DIR = "/storage/emulated/0/.PUBG/cache"
gg.EXT_FILES_DIR = "/storage/emulated/0/.PUBG/files"
gg.CACHE_DIR = "/storage/emulated/0/.PUBG/cache"
gg.FILES_DIR = "/storage/emulated/0/.PUBG/files"

--]]

--[[ Init Start --]]
function CLEAR(hide)
  gg.clearResults()
   if hide == true then
    if gg.isVisible(true) then
     gg.setVisible(false)
    end
   end
end
function KILL()
  gg.processKill()
  HOMENU = -1
end
function toast(txt)
  gg.toast(txt)
end
function alert(txt)
  gg.alert(txt)
end
function sleep(n)
  gg.sleep(n)
end
function get(n)
  result = gg.getResults(n)
  gg.addListItems(result)
  return result
end
function remove(show)
  t = gg.getListItems()
  if show == true then
  return print('removeListItems: ', gg.removeListItems(t))
  else
  return gg.removeListItems(t)
  end
end
function EXIT(remove)
  if remove == true then
  remove()
  end
  return os.exit()
end
function header()
time = os.time()
time = os.date('%Y-%m-%d-%H:%M:%S', time)
text = "🔷 PUBG: 0.8.1 ▎L3n4r0x ▎[L] = Lobby ▎[G] = In Game ▎"..time
return text
end
--[[ Init End --]]

HOME = 1
function HOME()
  toast(header())
    CLEAR()
  HM = gg.choice({
    "[Logo] Bypass Security",
    --"[G] WHSnap 625 ⏩ RED",
    "[Game] Cheat Lists",
    "Reload Game",
    "[TOOLS]",
    "EXIT Cheat !!!"
  }, nil, header())
  if HM == 1 then
    Security()
  end
  if HM == 2 then
    CHEAT()
  end
  if HM == 3 then
    KILL()
  end
 --[[ if HM == 6 then
    TOOLS()
  end --]]
  if HM == 4 then
    EXIT()
  end
  
  HOMENU = -1
end

function CHEAT()
  MN1 = gg.multiChoice({
    "⏩ S-Antena",
    "⏩ A-Antena",
    "⏩ C-Antena",
    --"⏩ RED",
    --"⏩ White",
    --"⏩ Rainbow",
    "➖➖BACK➖➖"
  }, nil, header())
  if MN1 == nil then
    gg.setVisible(false)
  else
    if MN1[1] == true then
      superAntena()
    end
    if MN1[2] == true then
      alwaysAntena()
    end 
    if MN1[3] == true then
      codamAntena()
    end --[[
    if MN1[4] == true then
      BODYCOLOR(391)
    end
    if MN1[5] == true then
      BODYCOLOR(0)
    end
    if MN1[6] == true then
      BODYCOLOR("1,00,035,591")
    end --]]
    if MN1[4] == true then
      HOME()
    end
  end
 
  HOMENU = -1
end

function TOOLS()
toast("Tools")
  HM = gg.choice({
    "Dump Memory",
    "Vechile",
    "Back to Home",
    "EXIT Tools !!!"
  }, nil, "PUBG: 0.8.1 ▎L3n4r0x")
  if HM == 1 then
    DUMP()
  end
  if HM == 2 then
    vechile()
  end
  if HM == 3 then
    HOME()
  end
  if HM == 4 then
    EXIT()
  end
  
  HOMENU = -1
end

function Security()
    CLEAR(true)
toast("Bypass is working...")
gg.searchNumber("1.5", gg.TYPE_AUTO, false, gg.SIGN_EQUAL, 0, -1)
    CLEAR(true)
gg.searchNumber("12", gg.TYPE_AUTO, false, gg.SIGN_EQUAL, 0, -1)
    CLEAR(true)
gg.setRanges(gg.REGION_BAD)
    CLEAR(true)
gg.searchNumber("2.718519e-43F;3.7615819e-37F;2.0F;0.00999999978F::200", gg.TYPE_FLOAT, false, gg.SIGN_EQUAL, 0, -1)
    CLEAR(true)
gg.searchNumber("1", gg.TYPE_FLOAT, false, gg.SIGN_EQUAL, 0, -1)
    get(300)
gg.editAll("0", gg.TYPE_FLOAT)
    remove()
    CLEAR(true)
toast("Bypassed ✓")
end
--[[
function SecurityV2()
  ALLMEM()
    CLEAR(true)
gg.searchNumber("12", gg.TYPE_AUTO, false, gg.SIGN_EQUAL, 0, -1)
    CLEAR(true)
gg.setRanges(gg.REGION_BAD)
    CLEAR(true)
gg.searchNumber("2.718519e-43F;3.7615819e-37F;2.0F;0.00999999978F::200", gg.TYPE_FLOAT, false, gg.SIGN_EQUAL, 0, -1)
    CLEAR(true)
gg.searchNumber("1", gg.TYPE_FLOAT, false, gg.SIGN_EQUAL, 0, -1)
    get(300)
gg.editAll("0", gg.TYPE_FLOAT)
    CLEAR(true)
-- end
-- function Additional()
toast("Bypass Additional")
gg.searchNumber("1.2F;1.8F:9::1", gg.TYPE_DOUBLE, false, gg.SIGN_EQUAL, 0, -1)
gg.searchNumber("1.1F;1.4F:3::1", gg.TYPE_DOUBLE, false, gg.SIGN_EQUAL, 0, -1)
gg.searchNumber("1.1D;1.4D:2::10", gg.TYPE_DOUBLE, false, gg.SIGN_EQUAL, 0, -1)
    CLEAR(true)
gg.searchNumber("5001;1.1;1F::10", gg.TYPE_DOUBLE, false, gg.SIGN_EQUAL, 0, -1)
    get(100)
gg.searchNumber("1.2F;1.8F:9::1", gg.TYPE_DOUBLE, false, gg.SIGN_EQUAL, 0, -1)
gg.searchNumber("1.1F;1.4F:3::1", gg.TYPE_DOUBLE, false, gg.SIGN_EQUAL, 0, -1)
gg.searchNumber("1.1D;1.4D:2::10", gg.TYPE_DOUBLE, false, gg.SIGN_EQUAL, 0, -1)
gg.clearResults(850)
gg.searchNumber("1.2F;1.8F:9::1", gg.TYPE_DOUBLE, false, gg.SIGN_EQUAL, 0, -1)
gg.searchNumber("1.1F;1.4F:3::1", gg.TYPE_DOUBLE, false, gg.SIGN_EQUAL, 0, -1)
gg.searchNumber("1.1D;1.4D:2::10", gg.TYPE_DOUBLE, false, gg.SIGN_EQUAL, 0, -1)
    CLEAR(true)
gg.searchNumber("5001;1.1;1F::10", gg.TYPE_DOUBLE, false, gg.SIGN_EQUAL, 0, -1)
    get(100)
gg.searchNumber("1.2F;1.8F:9::1", gg.TYPE_DOUBLE, false, gg.SIGN_EQUAL, 0, -1)
gg.searchNumber("1.1F;1.4F:3::1", gg.TYPE_DOUBLE, false, gg.SIGN_EQUAL, 0, -1)
gg.searchNumber("1.1D;1.4D:2::10", gg.TYPE_DOUBLE, false, gg.SIGN_EQUAL, 0, -1)
gg.clearResults(850)
    CLEAR(true)
toast("Additional Success")
end
]]
-- Wallhack

function superAntena()
gg.clearResults()
gg.setRanges(gg.REGION_ANONYMOUS)
gg.searchNumber("88.50576019287F;87.27782440186F;1F::50", gg.TYPE_FLOAT, false, gg.SIGN_EQUAL, 0, -1)
get(7)
gg.editAll("1.96875", gg.TYPE_FLOAT)
gg.clearResults()
gg.searchNumber("1.96875F;1.96875F;-100.91194152832;1F::50", gg.TYPE_FLOAT, false, gg.SIGN_EQUAL, 0, -1)
gg.searchNumber("1", gg.TYPE_FLOAT, false, gg.SIGN_EQUAL, 0, -1)
get(1)
gg.editAll("999", gg.TYPE_FLOAT)
gg.toast("Antena S Done")
end

function alwaysAntena()
gg.setRanges(gg.REGION_ANONYMOUS)
gg.clearResults()
gg.searchNumber("0.53446006775F;-1.68741035461F:501", gg.TYPE_FLOAT, false, gg.SIGN_EQUAL, 0, -1)
gg.searchNumber("-1.68741035461", gg.TYPE_FLOAT, false, gg.SIGN_EQUAL, 0, -1)
get(1995)
gg.editAll("19995", gg.TYPE_FLOAT)
gg.clearResults()
gg.searchNumber("18.38612365723F;0.54026412964F:5", gg.TYPE_FLOAT, false, gg.SIGN_EQUAL, 0, -1)
gg.searchNumber("18.38612365723F;0.54026412964F:5", gg.TYPE_FLOAT, false, gg.SIGN_EQUAL, 0, -1)
get(1995)
gg.editAll("19995", gg.TYPE_FLOAT)
gg.clearResults()
toast("Antena A Activated")
end

function codamAntena()
  gg.clearResults()
  gg.setRanges(gg.REGION_ANONYMOUS)
  gg.searchNumber("18.38613319397F;0.53447723389F;3.42665576935F:", gg.TYPE_FLOAT, false, gg.SIGN_EQUAL, 0, -1)
  get(10)
  gg.editAll("6666", gg.TYPE_FLOAT)
  gg.clearResults()
  gg.setRanges(gg.REGION_ANONYMOUS)
  gg.searchNumber("-1,076,364,016D;1,069 337,100D;1,091,058,328D;1,049,417 906D:13", gg.TYPE_DWORD)
  gg.searchNumber("-1,076,364,016", gg.TYPE_DWORD)
  get(100)
  gg.editAll("1,176,255,488", gg.TYPE_DWORD)
  gg.toast("ANTENAðŸ‡²ðŸ‡¨")
  gg.clearResults()
end

function WH425()
    CLEAR(true)
gg.setRanges(gg.REGION_BAD)
gg.searchNumber("135,215D;4,140D;3.7615819e-37;2::", gg.TYPE_FLOAT, false, gg.SIGN_EQUAL, 0, -1)
gg.searchNumber("2", gg.TYPE_FLOAT, false, gg.SIGN_EQUAL, 0, -1)
    get(10)
-- gg.editAll("130", gg.TYPE_FLOAT)
gg.editAll("120", gg.TYPE_FLOAT)
    CLEAR(true)
gg.setRanges(gg.REGION_BAD)
gg.searchNumber("194D;3.7615819e-37;2;-1;1;-127::", gg.TYPE_FLOAT, false, gg.SIGN_EQUAL, 0, -1)
gg.searchNumber("2", gg.TYPE_FLOAT, false, gg.SIGN_EQUAL, 0, -1)
    get(10)
-- gg.editAll("130", gg.TYPE_FLOAT)
gg.editAll("120", gg.TYPE_FLOAT)
    CLEAR(true)
toast("WH Activated")
end

function WH625()
toast("Wallhack Snapdragon 625")
     CLEAR(true)
gg.setRanges(gg.REGION_BAD)
gg.searchNumber("135,215D;4,140D;3.7615819e-37;2::", gg.TYPE_FLOAT, false, gg.SIGN_EQUAL, 0, -1)
gg.searchNumber("2", gg.TYPE_FLOAT, false, gg.SIGN_EQUAL, 0, -1)
    get(10)
gg.editAll("130", gg.TYPE_FLOAT)
     CLEAR(true)
gg.setRanges(gg.REGION_BAD)
gg.searchNumber("194D;3.7615819e-37;2;-1;1;-127::", gg.TYPE_FLOAT, false, gg.SIGN_EQUAL, 0, -1)
gg.searchNumber("2", gg.TYPE_FLOAT, false, gg.SIGN_EQUAL, 0, -1)
    get(10)
gg.editAll("130", gg.TYPE_FLOAT)
     CLEAR(true)
gg.toast("WH Snapdragon 625 Success")
     CLEAR(true)
end

function WH660()
gg.clearResults()
gg.setRanges(gg.REGION_BAD)
gg.searchNumber("5.1097599e21;2.0;1.6623071e-19;3.6734297e-39;1.66433e10::17", gg.TYPE_FLOAT, false, gg.SIGN_EQUAL, 0, -1)
gg.searchNumber("2", gg.TYPE_FLOAT, false, gg.SIGN_EQUAL, 0, -1)
    get(30)
gg.editAll("120", gg.TYPE_FLOAT)
gg.clearResults()
gg.searchNumber("2.0;-1.0;0.0;1.0;-127.0::17", gg.TYPE_FLOAT, false, gg.SIGN_EQUAL, 0, -1)
gg.searchNumber("2", gg.TYPE_FLOAT, false, gg.SIGN_EQUAL, 0, -1)
    get(30)
gg.editAll("120", gg.TYPE_FLOAT)
gg.clearResults()
gg.toast("Successful Activation")
end

--[[ BCOLOR
6 = yellow
7 | 391 = Red
1,00,035,591 = rainbow
--]]

function RED()
    CLEAR(true)
gg.setRanges(gg.REGION_BAD)
gg.searchNumber("8,192D;256D;8200D", gg.TYPE_DWORD, false, gg.SIGN_EQUAL, 0, -1)
gg.searchNumber("8200", gg.TYPE_DWORD, false, gg.SIGN_EQUAL, 0, -1)
    get(20)
gg.editAll("391", gg.TYPE_DWORD)
    CLEAR(true)
toast("RED Activated")
end

function BODYCOLOR(value)
 if value == nil then
  value = 391
 end

if value == "1,00,035,591" then
  toast("WARNING!!! Only work on Smooth Graphic")
gg.setRanges(gg.REGION_BAD)
gg.searchNumber("1,080,035,591D;196,617D;2.2509765625F::", gg.TYPE_DWORD, false, gg.SIGN_EQUAL, 0, -1)
gg.searchNumber("1,080,035,591", gg.TYPE_DWORD, false, gg.SIGN_EQUAL, 0, -1)
    get(10)
gg.editAll("1,00,035,591", gg.TYPE_DWORD)
     CLEAR(true) 
  
  else
  
gg.setRanges(gg.REGION_BAD)
gg.searchNumber("8,192D;256D;65,540D;12D;8200D", gg.TYPE_DWORD, false, gg.SIGN_EQUAL, 0, -1)
gg.searchNumber("8200", gg.TYPE_DWORD, false, gg.SIGN_EQUAL, 0, -1)
    get(100)
gg.editAll(value, gg.TYPE_DWORD)
    CLEAR(true)
  end
   
  if value == 391 or value == 7 then
  value = "Red"
  elseif value == 6 then
  value = "Yellow"
  elseif value == 0 then
  value = "White Animated"
  elseif value == "1,00,035,591" then
  value = "Rainbow"
  end

toast("Body "..value.." Colored!")
  
end

function vechile()
return HOME()
end

--[[ Test --]]
function DUMP()

print('dumpMemory:', gg.dumpMemory(0, 100, '/storage/emulated/0/.PUBG/TEMP'))

--[[ 0x9000, 0x9010 --]]
--[[ dump at least one memory page into the dir '/sdcard/dump' --]]
end

--[[
local clock = os.clock
function sleep(n)
   local t0 = clock()
   while clock() - t0 <= n do
   end
end
--]]

function CHIPSET()
  toast("🔷 Select Your Chipset")
    CLEAR(true)
  HM = gg.choice({
    "Default by script",
    "Snapdragon",
    "Mediatek",
    "Exynos",
    "Kirin",
  }, nil, header())
  if HM == 1 then
    gg.setRanges(gg.REGION_CODE_APP | gg.REGION_CODE_SYS | gg.REGION_ANONYMOUS | gg.REGION_BAD)
  elseif HM == 2 then
    gg.setRanges(gg.REGION_C_ALLOC | gg.REGION_C_BSS | gg.REGION_C_DATA | gg.REGION_C_HEAP | gg.REGION_ANONYMOUS | gg.REGION_BAD)
  elseif HM == 3 then
    gg.setRanges(gg.REGION_C_BSS | gg.REGION_ANONYMOUS | gg.REGION_BAD)
  elseif HM == 4 then
    gg.setRanges(gg.REGION_C_BSS | gg.REGION_ANONYMOUS | gg.REGION_BAD)
  elseif HM == 5 then
    gg.setRanges(gg.REGION_C_BSS | gg.REGION_ANONYMOUS | gg.REGION_BAD)
  else
   gg.setRanges(gg.REGION_CODE_APP | gg.REGION_CODE_SYS | gg.REGION_ANONYMOUS | gg.REGION_BAD | gg.REGION_C_ALLOC | gg.REGION_C_BSS | gg.REGION_C_DATA | gg.REGION_C_HEAP)
  end
  
  -- HOMENU = -1
  HOME()
end


local AI = gg.getTargetInfo()
if string.find(AI.packageName, "com.tencent.ig") and string.find(AI.sourceDir, "com.tencent.ig") then
CHIPSET()
else
alert("!!! Logging Detected !!!")
EXIT()
end

--[[ LOOP --]]

function ping()
url = "https://httpbin.org/headers"
  return gg.makeRequest(url)
end

while true do
  gg.setRanges(gg.REGION_C_ALLOC | gg.REGION_ANONYMOUS | gg.REGION_CODE_APP)
  if gg.isVisible(true) then
    HOMENU = 1
    gg.setVisible(false)
  end
  if HOMENU == 1 then
    HOME()
  end
  if ping ~= nil then
  ping()
  gg.sleep(500)
  end
end

--[[

function ping()
gg.makeRequest("https://google.me")
end

while false do
--timer.performWithDelay(1000, ping, 0)
ping()
gg.sleep(5000)
end
--]]

DOWNLOAD = true
DIR = gg.EXT_FILES_DIR
 if DOWNLOAD == true and string.find(gg.getFile(), "sc.lua") then
 local f = assert(io.open(gg.getFile(), 'w+'))
 f:write("Maaf Coba Lagi "..DIR)
 f:close()
 end