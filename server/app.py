from flask import Flask, jsonify, abort, request
from flask_cors import CORS
import tweepy
from textblob import TextBlob

# Twitter OAuth Tokens and Keys
consumer_key = ''
consumer_secret = ''
access_token = ''
access_token_secret = ''

# Setting OAuth 
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)

# Create Tweepy API
api = tweepy.API(auth)

# Create Flask App
app = Flask(__name__)

CORS(app, resources={r"*": {"origins": "*"}})

@app.route('/', methods=['GET'])
def home():
    return 'Twitter Sentiment Analyser REST API.'

@app.route('/analyse', methods=['GET'])
def analyse():
    if request.args.get('hashtag') == 'true':
        tweets = api.search('#{}'.format(request.args.get('search')), lang='en', count=100)
    else:
        tweets = api.search(q=request.args.get('search'), lang='en', count=100)
    res = []
    for tweet in tweets:
        sentiment = TextBlob(tweet.text).sentiment
        res.append({'text': tweet.text, 'subjectivity': sentiment.subjectivity, 'polarity': sentiment.polarity, 'author': tweet.user.screen_name})
    return jsonify(res)
