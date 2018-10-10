from flask import Flask, jsonify, request, render_template
from flask_restful import Resource, Api
from canvasapi import Canvas

# FLASK_APP=imats_helper.py FLASK_ENV=development flask run
app = Flask(__name__)

API_URL = ''
API_KEY = ''
canvas    = Canvas(API_URL, API_KEY)


def authenticate_user():
    store = file.Storage('token.json')
    creds = store.get()
    if not creds or creds.invalid:
        flow = client.flow_from_clientsecrets('credentials.json', SCOPES)
        creds = tools.run_flow(flow, store)
    service = build('drive', 'v3', http=creds.authorize(Http()))
    return service





@app.route('/')
def index():
	return render_template('index.html')

@app.route('/emails')
def emails():
	course_id = request.args.get('course_id')
	print(course_id)
	course    = canvas.get_course(course_id)
	users     = [user for user in course.get_users()]
	profiles  = [user.get_profile() for user in users]
	emails    = [profile['primary_email'] for profile in profiles]
	return jsonify(emails)

@app.route('/names')
def names():
	course_id = request.args.get('course_id')
	print(course_id)
	course    = canvas.get_course(course_id)
	users     = [user for user in course.get_users()]
	profiles  = [user.get_profile() for user in users]
	names     = [profile['name'] for profile in profiles]
	return jsonify(names)


if __name__ == '__main__':
    app.run(debug=True)
