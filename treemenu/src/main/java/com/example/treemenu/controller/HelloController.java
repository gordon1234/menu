package com.example.treemenu.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HelloController {

    @RequestMapping("/hello")
    public String helloHtml() {
        return "treeMenu";
    }

    @RequestMapping("/menu2")
    public ModelAndView index(){
        return new ModelAndView("treeMenu");
    }
}
