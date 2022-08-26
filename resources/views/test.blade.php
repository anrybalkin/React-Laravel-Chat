<!doctype html>
<html lang="en">
<head>
    <title> Create Post - CKEditor 4 Example </title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>
<body>
    <div class="container mt-5">
        <form action="{{ route('posts.store') }}" method="POST">
            <div class="row">
                <div class="col-xl-8 col-lg-8 col-sm-12 col-12 m-auto">
                    <div class="card shadow">
                        <div class="card-header">
                            <h4 class="card-title font-weight-bold"> Laravel Form Handling Without CSRF Token </h4>
                        </div>
                        <div class="card-body">
                            <div class="form-group">
                                <label> Title </label>
                                <input type="text" class="form-control" name="title" placeholder="Enter the Title">
                            </div>
                            <div class="form-group">
                                <label> Body </label>
                                <textarea class="form-control" id="description" placeholder="Enter the Description"
                                    name="description"></textarea>
                            </div>
                        </div>
                        <div class="card-footer">
                            <button type="submit" class="btn btn-success"> Save </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</body>
</html>