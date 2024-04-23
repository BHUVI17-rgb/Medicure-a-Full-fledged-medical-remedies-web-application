# Import the required library 
import psycopg2 

# Method to create a connection object 
# It creates a pointer cursor to the database 
# and returns it along with Connection object 
def create_connection(): 
	# Connect to the database 
	# using the psycopg2 adapter. 
	# Pass your database name ,# username , password , 
	# hostname and port number 
	conn = psycopg2.connect(dbname='world', user='postgres', password='Bhuvanesh@172629', host='localhost', port='5432') 
	# Get the cursor object from the connection object 
	curr = conn.cursor() 
	return conn, curr 

# def create_table(): 
# 	try: 
# 		# Get the cursor object from the connection object 
# 		conn, curr = create_connection() 
# 		try: 
# 			# Fire the CREATE query 
# 			# curr.execute("CREATE TABLE IF NOT EXISTS cartoon(cartoonID INTEGER, name TEXT,cartoonImg BYTEA)") 
			
# 		except(Exception, psycopg2.Error) as error: 
# 			# Print exception 
# 			print("Error while creating cartoon table", error) 
# 		finally: 
# 			# Close the connection object 
# 			conn.commit() 
# 			conn.close() 
# 	finally: 
# 		# Since we do not have to do anything here we will pass 
# 		pass

def write_blob(cartoonID,file_path1,file_path2,file_path3,file_path4,file_path5,file_path6,file_path7): 
	try: 
		# Read data from a image file 
		drawing1 = open(file_path1, 'rb').read() 
		drawing2 = open(file_path2, 'rb').read() 
		drawing3 = open(file_path3, 'rb').read() 
		drawing4 = open(file_path4, 'rb').read() 
		drawing5 = open(file_path5, 'rb').read() 
		drawing6 = open(file_path6, 'rb').read() 
		# Read database configuration 
		conn, cursor = create_connection() 
		try:		 
			# Execute the INSERT statement 
			# Convert the image data to Binary 
			cursor.execute("INSERT INTO information (id,img1,img2,pill_img1,pill_img2,pill_img3,pill_img4) " +"VALUES(%s,%s,%s,%s,%s,%s,%s)",( cartoonID,psycopg2.Binary(drawing1),psycopg2.Binary(drawing2),psycopg2.Binary(drawing3),psycopg2.Binary(drawing4),psycopg2.Binary(drawing5),psycopg2.Binary(drawing6))) 
			print("Successful")
			# Commit the changes to the database 
			conn.commit() 
		except (Exception, psycopg2.DatabaseError) as error: 
			print("Error while inserting data in cartoon table", error) 
		finally: 
			# Close the connection object 
			conn.close() 
	finally: 
		# Since we do not have to do 
		# anything here we will pass 
		pass
		
# Call the create table method	 
# create_table() 
# Prepare sample data, of images, from local drive 
# write_blob(3,"D:\webdev\asthma.jfif") 
# write_blob(4,"D:\webdev\alzheimer.jfif") 
# write_blob(5,"D:\webdev\bronchitis.jfif") 
# write_blob(3,"D:\webdev\asth.jfif") 
# write_blob(4,"D:\webdev\depression.jfif") 
# write_blob(5,"D:\webdev\diabetes.jfif") 
# write_blob(6,"D:\webdev\gastrouble.jfif") 
# write_blob(7,"D:\webdev\hairloss.jfif") 
# write_blob(8,"D:\webdev\insomnia.jfif") 
# write_blob(9,"D:\webdev\stroke.jfif") 
write_blob(2,"D:\webdev\commoncold_img1.jfif","D:\webdev\commoncold_img2.jfif","D:\webdev\commoncold_pillimg1.jfif","D:\webdev\commoncold_pillimg2.jfif","D:\webdev\commoncold_pillimg3.jfif","D:\webdev\commoncold_pillimg3.jfif","D:\webdev\commoncold_pillimg4jfif.jfif")
# write_blob(3,"F:\\TeachPytho\\GFGPhotos\\tintin.png","Tintin") 
# write_blob(4,"F:\\TeachPytho\\GFGPhotos\\pikachu.jpg","Pikachu") 
# write_blob(5,"F:\\TeachPytho\\GFGPhotos\\kungfupanda.jpg","Kung Fu Panda") 
