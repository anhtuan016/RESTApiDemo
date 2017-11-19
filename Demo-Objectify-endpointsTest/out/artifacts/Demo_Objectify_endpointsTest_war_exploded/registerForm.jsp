<%--
  Created by IntelliJ IDEA.
  User: ADMIN-PC
  Date: 11/14/2017
  Time: 10:01 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>RegisterForm</title>
</head>
<body>

<form action="/_api/v1/student" method="POST" id="registerForm">
    <fieldset>
        <legend>Form Dang Ky</legend>
        <div class="form-group">
            <label >ID</label>
            <input type="text" name="id" id="id">
        </div>
        <div class="form-group">
            <label>FullName</label>
            <input type="text" name="fullName" id="fullName">
        </div>
        <div class="form-group">
            <label >Rollnum</label>
            <input type="text" name="rollNumber" id="rollNumber">
        </div>
        <div class="form-group">
            <label >Address</label>
            <input type="text" name="address" id="address">
        </div>
        <div class="form-group">
            <label >Email</label>
            <input type="text" name="email" id="email">
        </div>
        <button type="button" id="registerButton">SUBMIT</button>
    </fieldset>
</form>

<button type="button" id="getList"> GET LIST</button>
<button type="button" id="getStudentById">GET A STUDENT</button>
<button type="button" id="delete">DELETE</button>
<div id="list"></div>
<button type="button" id="edit">EditStudent</button>

<script src="/js/js.js" type="text/javascript" charset="utf-8"></script>


</body>
</html>
