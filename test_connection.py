import pymongo


def mongo_connect():
    try:
        conn = pymongo.MongoClient()
        print "Mongo is connected!"
        return conn
    except pymongo.errors.ConnectionFailure, e:
        print "Could not connect to MongoDB: %s" % e


conn = mongo_connect()
db = conn['USschooldonors']
print db  # Database (MongoClient('localhost' 27017), u'schooldonors')

# Note test 1 is successful printed: Mongo is connected!
# local connection to Mongo DB is made

coll = db.donations
print db.collection_names()  # [u'donations']

# Note test 2 is successful printed name of collection: donations

print "IL count"
results = coll.find({"school_state": "IL"})
print results.count()
print "----------------------------------"

print "SC count"
results = coll.find({"school_state": "SC"})
print results.count()
print "----------------------------------"

print "TX count"
results = coll.find({"school_state": "TX"})
print results.count()
print "----------------------------------"

print "IN count"
results = coll.find({"school_state": "IN"})
print results.count()
print "----------------------------------"

print "TN count"
results = coll.find({"school_state": "TN"})
print results.count()
print "----------------------------------"

print "KS count"
results = coll.find({"school_state": "KS"})
print results.count()
print "----------------------------------"

print "CO count"
results = coll.find({"school_state": "CO"})
print results.count()
print "----------------------------------"

print "MA count"
results = coll.find({"school_state": "MA"})
print results.count()
print "----------------------------------"

print "RI count"
results = coll.find({"school_state": "RI"})
print results.count()
print "----------------------------------"

print "MI count"
results = coll.find({"school_state": "MI"})
print results.count()
print "----------------------------------"

print "MN count"
results = coll.find({"school_state": "MN"})
print results.count()
print "----------------------------------"

print "AZ count"
results = coll.find({"school_state": "AZ"})
print results.count()
print "----------------------------------"

print "KY count"
results = coll.find({"school_state": "KY"})
print results.count()
print "----------------------------------"

print "UT count"
results = coll.find({"school_state": "UT"})
print results.count()
print "----------------------------------"

print "OH count"
results = coll.find({"school_state": "OH"})
print results.count()
print "----------------------------------"

print "FL count"
results = coll.find({"school_state": "FL"})
print results.count()
print "----------------------------------"

print "OR count"
results = coll.find({"school_state": "OR"})
print results.count()
print "----------------------------------"

print "GA count"
results = coll.find({"school_state": "GA"})
print results.count()
print "----------------------------------"

print "NV count"
results = coll.find({"school_state": "NV"})
print results.count()
print "----------------------------------"

print "ID count"
results = coll.find({"school_state": "ID"})
print results.count()
print "----------------------------------"

print "WI count"
results = coll.find({"school_state": "WI"})
print results.count()
print "----------------------------------"

print "HI count"
results = coll.find({"school_state": "HI"})
print results.count()
print "----------------------------------"

print "NH count"
results = coll.find({"school_state": "NH"})
print results.count()
print "----------------------------------"

print "MI count"
results = coll.find({"school_state": "MT"})
print results.count()
print "----------------------------------"

print "AR count"
results = coll.find({"school_state": "AR"})
print results.count()
print "----------------------------------"

print "AK count"
results = coll.find({"school_state": "AK"})
print results.count()

print "----------------------------------"
print "Collection: Donations count"
print coll.count()  # 386455

# Note test 3 is successful printed counts of data from school_states requested


""" Note require additional reduction of database - current includes states:
IL, SC, TX, IN, TN, KS, CO, MA, RI, MI, MN, AZ, KY, 
UT, OH, FL, OR, GA, NV, ID, WI, HI, NH, MT, AR, AK
"""

"""RESULTS OF COUNT
IL count *remove*
49669
----------------------------------
SC count *remove*
24735
----------------------------------
TX count *remove*
55114
----------------------------------
IN count *remove*
22412
----------------------------------
TN count *remove*
18661
----------------------------------
KS count
3937
----------------------------------
CO count *remove*
9510
----------------------------------
MA count *remove*
13891
----------------------------------
RI count *remove*
2786
----------------------------------
MI count *remove*
17688
----------------------------------
MN count
6392
----------------------------------
AZ count *remove*
13573
----------------------------------
KY count  
6324
----------------------------------
UT count *remove*
12339
----------------------------------
OH count *remove*
11551
----------------------------------
FL count *remove*
43023
----------------------------------
OR count *remove*
9451
----------------------------------
GA count *remove*
23814
----------------------------------
NV count *remove*
11146
----------------------------------
ID count
3206
----------------------------------
WI count *remove*
9561
----------------------------------
HI count
3921
----------------------------------
NH count *remove*
2068
----------------------------------
MI count *remove*
1343
----------------------------------
AR count *remove*
8234
----------------------------------
AK count
2106
----------------------------------
Collection: Donations count
386455

Above count based on initial database before reduction of data via removal of school_states
"""

# Removed more data to limit upload speed via mongo
# Selection of school_states to be removed based on count similar to DE

"""
New collection includes following states = KS, MN, KY, ID, HI, DE*, AK (* = project school_state)
Kept random number states for comparative purposes.
"""
print "----------------------------------"

print "RR count"
results = coll.find({"school_state": "RR"})
print results.count()  # should display 0

# Note test 4 is successful, printed 0 results count for school_state that is non-existent
