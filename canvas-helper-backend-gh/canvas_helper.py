from flask import Flask, jsonify, request, render_template
from flask_restful import Resource, Api
from canvasapi import Canvas

# FLASK_APP=imats_helper.py FLASK_ENV=development flask run
app = Flask(__name__)

API_URL = ''
API_KEY = ''
canvas    = Canvas(API_URL, API_KEY)

def get_credentials():
	credential_path = 'credentials.json'

	store = Storage(credential_path)
	credentials = store.get()
	if not credentials or credentials.invalid:
		print("Credentials not found.")
		return False
	else:
		print("Credentials fetched successfully.")
		return credentials
	
	
def fetch(query, sort='modifiedTime desc'):
	credentials = get_credentials()
	http = credentials.authorize(httplib2.Http())
	service = discovery.build('drive', 'v3', http=http)
	results = service.files().list(
		q=query,orderBy=sort,pageSize=10,fields="nextPageToken, files(id, name)").execute()
	items = results.get('files', [])
	return items


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
	credentials = get_credentials()
	if credentials == False:
		return redirect(url_for('oauth2callback'))
	elif credentials.access_token_expired:
		return redirect(url_for('oauth2callback'))
	else:
		print('now calling fetch')
		all_files = fetch("'root' in parents and mimeType = 'application/vnd.google-apps.folder'", sort='modifiedTime desc')
		s = ""
		for file in all_files:
			s += "%s, %s<br>" % (file['name'],file['id'])
		return s

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
    app.secret_key = str(uuid.uuid4())
    app.run(debug=True)
