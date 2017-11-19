package com.controller;

import com.entity.Student;
import com.google.appengine.repackaged.com.google.common.base.StringUtil;
import com.google.appengine.repackaged.com.google.gson.Gson;
import com.googlecode.objectify.Key;
import com.googlecode.objectify.ObjectifyService;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.*;

import static com.googlecode.objectify.ObjectifyService.ofy;

public class StudentController extends HttpServlet {
    static {
        ObjectifyService.register(Student.class);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String URI = req.getRequestURI();
        String URISplit[] = URI.split("/");
        if (URISplit.length == 4) {
            List<Student> list = ofy().load().type(Student.class).list();
            Gson gson = new Gson();
            resp.setContentType("application/json");
            resp.getWriter().write(gson.toJson(list));
        } else {
            String id = URISplit[URISplit.length - 1];
            Key<Student> idKey = Key.create(Student.class, id);
            Student student = ofy().load().key(idKey).now();
//            ArrayList<Student> list = new ArrayList<>();
//            list.add(student);
            Gson gson = new Gson();

            resp.setContentType("application/json");
            resp.getWriter().write(gson.toJson(student));
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        String reqURI = req.getRequestURI();
//        System.out.println("URI= "+ reqURI);
        BufferedReader reader = req.getReader();
        StringBuffer buffer = new StringBuffer();
        String line;
        while ((line = reader.readLine()) != null) {
            buffer.append(line);
        }
        System.out.println("text" + buffer.toString());
        Gson gson = new Gson();
        Student student = gson.fromJson(buffer.toString(), Student.class);
        ofy().save().entity(student).now();

    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String URI = req.getRequestURI();
        String URISplit[] = URI.split("/");
        String id = URISplit[URISplit.length - 1];
        Key<Student> keyStudent = Key.create(Student.class, id);
        Student student = ofy().load().key(keyStudent).now();
        student.setRollNumber("Da Xoa");
        ofy().save().entity(student).now();
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        BufferedReader reader = req.getReader();
        StringBuffer buffer = new StringBuffer();
        String line;
        while ((line=reader.readLine())!=null){
            buffer.append(line);
        }
        System.out.println(buffer.toString());
        Gson gson = new Gson();
        Student student = gson.fromJson(buffer.toString(),Student.class);
        ofy().save().entity(student).now();
    }
}
