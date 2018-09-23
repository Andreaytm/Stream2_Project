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

print "----------------------------------"

print "RR count"
results = coll.find({"school_state": "RR"})
print results.count()  # should display 0

# Note test 4 is successful, printed 0 results count
#  for school_state that is non-existent
