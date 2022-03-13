# RestAPI and ResfulAPI (some information about API)
+ HTTP has 9 type of method, 2 Types the most population : Get and Post

+ The callback function has 2 parameters, req(request) and res (response) 
+ _The req represents the HTTP request and has properties for the request query string 
+ _The res represents the HTTP response that the Express app sends when it receives an HTTP

# Mô hình client - server / Req and res 
# View Engine 
# Mô hình MVC 
+ Views 


+ Models
- Kết nối trực tiếp DB trả dữ liệu về Controllers

+ Controllers 
- Lấy cái dữ liệu từ models trả về views
- Routers => res and req 
$(document).ready(function() {
    $(button).click(function() {
        $("p").hide(); // select all p element in HTML
        $("#test"); // select id to find specific element
    })
}) 

+ ORM 

+ Request Method
- Get : Lấy thông tin về/ Read 
- Post : Create Data
- Put : Update data 
- Delete : Xóa dữ liệu 

+ Connection with DB 
- Using mysql2 to Store data (in xampp => localhost:81/phpadmin)



# Middleware Buổi Thứ 3 (8/3/2022)
## Tìm hiểu về middleware, giới thiệu một số middleware hay dùng.
## Xử lý lỗi với mongodb qua middleware.
## Middleware trong framework mongoose.
## Tạo quan hệ giữa các model trong mongodb.
## Truy vấn nâng cao trong mongodb.
## Upload files.

### Tìm hiểu về middleware, giới thiệu một số middleware hay dùng.
+ Concept: Middleware là 1 phần rất quan trọng giúp chúng ta lọc và ngăn chặn các request xấu. Nó là các hàm khác nhau được gọi bởi Route Express trước khi yêu cầu request completely 

+ Các hàm middleware có thể thực thi ở đầu, giữa hoặc ở cuối 1 request (request -> Middleware -> response)

+ Use case: parseJSON, parseCookie, Check login, or write module so fast.

+ Các typeOf middleware: 
- Application level Middleware
+ Thêm các hàm app.use(), app.GET(), app.PUT(), app.POST()...
Khi middleware được declare with app.use() thì all request phải đi qua middleware function
+ Khi middleware được khai báo bằng cách sử dụng các route thì nó chỉ các request trong route đó mới thông qua middleware function :
            app.get('/user/:id', function (req, res, next) {
              console.log('ID:', req.params.id)
              next()
            }, function (req, res, next) {
              res.send('User Info')
            })

- Route level Middleware
+ Cách thức hoạt động giống như Application-level middleware but It dependences on express.Router()
router.use(function(req, res, next) {
    console.log("Middleware running")
    next()
})

- Error-Handling Middleware
+ Instead truyền 3 parameters vào hàm middlware as above example. You should pass 4 parameters, Tham số đầu tiên sẽ là biến nhận kết quả lỗi của middleware
            app.use(function(err, req, res, next) {
                console.log(err.stack)
            res.status(500).send("Some broke!")
            })

- Third-Party Middleware
+ Use Middleware của bên thứ 3 để scalabe your project
- As body-Parser

### Xử lý lỗi với mongodb qua middleware.
+ Mongoose has 2 types of middleware "pre" and "post" middleware
+ Pre executes before the wrapped function
+ Post middleware executes after the wrapped function 
            schema.pre('save', function(next) {
                console.log('before save');
                next();
            });

            schema.post('save', function(doc) {
                console.log('after save');
            });

            doc.save(); // Prints 'before save' followed by 'after save'
+ However, post middleware has been interchangeable(đổi chỗ) with on() calls.
+ Handler Must take 3 parameters
+ Has 4 function in mongoose that can trigger a duplicate key error: save(), findOneAndUpdate(), update(), insertMany()

## Middleware trong framework mongoose. 
+ Mongoose có 4 loại middleware: document middleware, model middleware, aggregate middleware and query middleware 
+ Trong đó middleware document support làm việc với các hàm document

+ Pre-middleware 
- Được thực hiện sau mỗi lần được gọi
- Thay vì dùng next() có thể return về 1 promise


## Relational Database with mongodb 
+ What is a db? A collection of information, stored on a computer. There two main types of database are relational and non-relational 

+ Relational DB: Stores information in tables. These tables have shared information between them.

+ A table uses columns to define the information being stored and rows for the actual data. Each table will have a column that is defined as having to have unique values. This will be the PRIMARY KEY. 
+ When one table's primary key is used to in another table. This column in the second table is known as the foreign key. 

### Advantages of relational databases 

## Non-Relational DB 
+ Key-value db: is the most basic type of database. It also an advantage. Because evrything is stored as a unique key and value 

+ Graph DBs are the most specialized of the non-relational dbs types. They use a structure of elements called nodes that store data and edges (cạnh) between them contain attributes about the relationship.

### When to use a relational DB? 
+ If you predicable, in terms of structure, size and frequency of access (tần số truy nhập). It's still the best choice. 

### When to use a NON-RELATIONAL DB? 
+ In eCommerce


### Model One-to- One, One-to-Many, Many-To-Many, Many-to-One

### Upload files
+ Module for working with file uploads called "Formidable" or Multer (can be installed using NPM) is a middleware of Express and Nodejs. Hept us handle data multipart/form-data when user uploading file.
+ Include if you use it


### MongoDB Advanced Queries Function 
+ Setting a value of 1 means we want to display the content of the field
+ Setting a value of 0 means we don't want to display the contents of the field 
### Note: Setting a field to 1 will automatically set other fields to 0, except the _id field. Therefore you do not have to explicitly set all the other fields to 0. 

### Sorting the Result of Query
+ Using the sort() method, if u want to return in ascending order, use 1 or use -1 to return in descending

+ For instance: db.collectionName.find().sort({age: 1})
+ You can sort by multiple fields

### Sorting with Limits
+ To return specifies the number of documents that are returned. 
+ Set provide more flexiblity to your query. 

### Counting Documents 
+ count() method help you do that. 

### Query operators 
+ We have some query operators:
#### Comparision Query Operator
- $ne: not-equal
- $gt: greater than
- $gte: greater than or equal to
- $lt: less than
- $lte: less than or equal to
- $in: uses an array return fields matching any value specified in the array 

#### Logical Query Operator
- $and: Nếu tất cả các tiêu chí thỏa mãn (satisfied). It will return document
- $not: Return the documents that do not match tiêu chuẩn (criteria)
- $nor: Return the documents that fall all the query expressions. 
- $or: if either one is true -> return the document

# Note: Connect to DB
+ ADD current IP of computer 
+ ADD url of MongoDB Compas 

# BTVN buổi 4
Tạo 1 model User, Post phù hợp với các yêu cầu dưới
User và Post là quan hệ 1 - n (1 người có thể có nhiều bài viết)
Viết các api sau:
Lấy ra thông tin và bài viết của tất cả user
Lấy ra thông tin và bài viết của 1 người dùng theo (id user)
Lấy ra các user có tuổi nằm trong khoảng 18 - 40 tuổi
Lấy ra các user có tên bắt đầu bằng chữ "h"
Cập nhật thông tin của người dùng theo id
Xoá người dùng theo id
Viết 1 middleware để các api thứ 1,3,4,6 phải có quyền admin mới được dùng