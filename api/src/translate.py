import os
import pathlib
import argparse
import sys

from projalgoChoreo import projectChoreo
from projalgoRoles import projRoles
from utils.formatting import getFileName

def main():
    filename = getFileName()
    file = open(os.path.join(filename), 'r')
    data = file.readlines()
    file.close()

    target='src/resources/'

    projectChoreo(data, target)
    projRoles(data, target)

if __name__ == "__main__":
    main()