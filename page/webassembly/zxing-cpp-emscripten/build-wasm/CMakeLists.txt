#
# CMake listfile to specify the build process, see:
# http://www.cmake.org/cmake/help/documentation.html
#
project(zxing)
cmake_minimum_required(VERSION 2.8.0)

set(CMAKE_LIBRARY_PATH /opt/local/lib ${CMAKE_LIBRARY_PATH})

# Check for polluted source tree.
if(EXISTS ${CMAKE_SOURCE_DIR}/CMakeCache.txt OR
    EXISTS ${CMAKE_SOURCE_DIR}/CMakeFiles)
    message(FATAL_ERROR
        "Source directory is polluted:"
        "\n  * remove CMakeCache.txt"
        "\n  * remove CMakeFiles directory")
endif()

# Suppress in-source builds.
if(${CMAKE_SOURCE_DIR} STREQUAL ${CMAKE_BINARY_DIR})
    message(FATAL_ERROR
        "CMake generation is not allowed within the source directory:"
        "\n  * mkdir build"
        "\n  * cd build"
        "\n  * Unix-like: cmake -G \"Unix Makefiles\" .."
        "\n  * Windows: cmake -G \"Visual Studio 10\" ..")
endif()

# Adjust CMake's module path.
set(CMAKE_MODULE_PATH ${CMAKE_SOURCE_DIR}/cmake/)

# Suppress MSVC CRT warnings.
if(MSVC)
    add_definitions(-D_CRT_SECURE_NO_WARNINGS)
    add_definitions(/Za)
endif()

if (EMSCRIPTEN)
    set(CMAKE_AR "emcc")
    set(CMAKE_STATIC_LIBRARY_SUFFIX ".bc")
    set(CMAKE_C_CREATE_STATIC_LIBRARY "<CMAKE_AR> -o <TARGET> <LINK_FLAGS> <OBJECTS>")
    set(CMAKE_CXX_CREATE_STATIC_LIBRARY "<CMAKE_AR> -o <TARGET> <LINK_FLAGS> <OBJECTS>")
endif()

set(CMAKE_CXX_FLAGS "-std=c++11 --bind -Oz -s WASM=1 -s ASSERTIONS=1 -s RESERVED_FUNCTION_POINTERS=20 -s DISABLE_EXCEPTION_CATCHING=0 --memory-init-file 0 -s EXPORTED_FUNCTIONS=\"['_resize','_decode_qr','_decode_qr_multi','_decode_any','_decode_multi','_decode_codabar','_decode_code128','_decode_code39','_decode_code93','_decode_ean13','_decode_ean8','_decode_itf','_decode_multi_one_d','_decode_multi_upc_ean','_decode_upca','_decode_upce']\" -s EXTRA_EXPORTED_RUNTIME_METHODS=\"['addFunction']\"")

# Add libzxing library.
file(GLOB_RECURSE LIBZXING_FILES
    "./core/src/*.cpp"
    "./core/src/*.h"
    "./core/src/*.cc"
    "./core/src/*.hh"
)
include_directories("./core/src/")
add_library(libzxing STATIC ${LIBZXING_FILES})
set_target_properties(libzxing PROPERTIES PREFIX "")
add_definitions(-DNO_ICONV=1)

# Add cli executable.
file(GLOB_RECURSE ZXING_FILES
    "./emscripten/zxing.js.cpp"
    "./core/src/*.cpp"
    "./core/src/*.cc"
)
add_executable(zxing ${ZXING_FILES})
target_link_libraries(zxing)

# Add testrunner executable.
find_package(CPPUNIT)
if(CPPUNIT_FOUND)
    file(GLOB_RECURSE TESTRUNNER_FILES
        "./core/tests/src/*.cpp"
        "./core/tests/src/*.h"
    )
    add_executable(testrunner ${TESTRUNNER_FILES})
    include_directories(${CPPUNIT_INCLUDE_DIR})
    target_link_libraries(testrunner libzxing  ${CPPUNIT_LIBRARIES})
else()
    message(WARNING "Not building testrunner, because CppUnit is missing")
endif()
