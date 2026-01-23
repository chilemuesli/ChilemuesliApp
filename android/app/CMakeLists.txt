cmake_minimum_required(VERSION 3.13)

# Define the library name
project(chilemuesliapp)

# Set 16KB page size alignment flags properly
set(CMAKE_SHARED_LINKER_FLAGS "${CMAKE_SHARED_LINKER_FLAGS} -Wl,-z,max-page-size=16384")
set(CMAKE_EXE_LINKER_FLAGS "${CMAKE_EXE_LINKER_FLAGS} -Wl,-z,max-page-size=16384")

# Create the shared library
add_library(${PROJECT_NAME} SHARED
    src/main/cpp/dummy.cpp
)

# Set linker flags for this specific target
set_target_properties(${PROJECT_NAME} PROPERTIES
    LINK_FLAGS "-Wl,-z,max-page-size=16384"
)

# Link the required libraries
target_link_libraries(${PROJECT_NAME}
    android
)