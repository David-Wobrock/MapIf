#!/usr/bin/env python3
# -!- encoding:utf8 -!-
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#    file: request.py
#    date: 2017-09-23
#  author: paul.dautry
# purpose:
#   Interface to perform web requests relying on requests module with failsafe 
#   protections. 
# license:
#    MapIF - Where are INSA de Lyon IF students right now ?
#    Copyright (C) 2017  Loic Touzard
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU General Public License as published by
#    the Free Software Foundation, either version 3 of the License, or
#    (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU General Public License for more details.
#
#    You should have received a copy of the GNU General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#===============================================================================
# IMPORTS
#===============================================================================
import requests
from core.modules import logger
#===============================================================================
# GLOBALS
#===============================================================================
DFLT_TIMEOUT = 2 # 2 seconds of default timeout
EXCEPTION_RAISED = False
modlgr = logger.get('mapif.request')
#===============================================================================
# FUNCTIONS
#===============================================================================
#-------------------------------------------------------------------------------
# get
#-------------------------------------------------------------------------------
def get(url, params, timeout=DFLT_TIMEOUT, headers=None):
    global EXCEPTION_RAISED
    try:
        if headers is None:
            return requests.get(url, params=params, timeout=timeout)
        else:
            return requests.get(url, params=params, timeout=timeout, headers=headers)
    except Exception as e:
        EXCEPTION_RAISED = True
        modlgr.exception("request.get(): failed.")
    return None
#-------------------------------------------------------------------------------
# post
#-------------------------------------------------------------------------------
def post(url, data, timeout=DFLT_TIMEOUT, headers=None):
    global EXCEPTION_RAISED
    try:
        if headers is None:
            return requests.post(url, data=data, timeout=timeout)
        else:
            return requests.post(url, data=data, timeout=timeout, headers=headers)
    except Exception as e:
        EXCEPTION_RAISED = True
        modlgr.exception("request.post(): failed.")
    return None
#-------------------------------------------------------------------------------
# exception_raised
#-------------------------------------------------------------------------------
def exception_raised():
    global EXCEPTION_RAISED
    if EXCEPTION_RAISED:
        EXCEPTION_RAISED = False
        return True
    return False
#===============================================================================
# TESTS
#===============================================================================
def test():
    print('REQUEST - TESTS NOT IMPLEMENTED')
