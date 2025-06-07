cmake_minimum_required(VERSION 3.13)

# Define the library name
project(chilemuesliapp)

# Create the shared library
add_library(${PROJECT_NAME} SHARED
    src/main/cpp/dummy.cpp
)

# Link the required libraries
target_link_libraries(${PROJECT_NAME}
    android
)