/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

};
var pictureSource;   // picture source
var destinationType; // sets the format of returned value
var CompletedList = [];
var PendingList = [];
var emailplugin;

function onDeviceReady() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
    emailplugin = window.Plugin.email;
 

}
function capturePhoto() {
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail,
         {
             quality: 50,
             destinationType: destinationType.DATA_URL, saveToPhotoAlbum: true
         });
    nav
}
function onPhotoDataSuccess(imageData) {
    // Uncomment to view the base64-encoded image data
    // console.log(imageData);

    // Get image handle
    //
    var smallImage = document.getElementById('smallImage');

    // Unhide image elements
    //
    smallImage.style.display = 'block';

    // Show the captured photo
    // The in-line CSS rules are used to resize the image
    //
    smallImage.src = "data:image/jpeg;base64," + imageData;
}
function onPhotoURISuccess(imageURI) {
    var largeImage = document.getElementById('largeImage');

    // Unhide image elements
    //
    largeImage.style.display = 'block';

    // Show the captured photo
    // The in-line CSS rules are used to resize the image
    //
    largeImage.src = imageURI;
}
function onFail(message) {
    alert('Failed because: ' + message);
}
function AddEntry() {
    //  localStorage.clear();
    // Parse any JSON previously stored in allEntries
    var existingEntries = JSON.parse(localStorage.getItem("CompletedList"));
    if (existingEntries == null) existingEntries = [];
    var entryTitle = document.getElementById("JobTitle").value;
    var entryText = document.getElementById("Description").value;
    var entry =
        {
            "title": entryTitle,
            "text": entryText,
        };


    localStorage.setItem("entry", JSON.stringify(entry));
    // Save allEntries back to local storage
    existingEntries.push(entry);
    if (typeof (Storage) !== "undefined") {
        localStorage.setItem("CompletedList", JSON.stringify(existingEntries));
    }
    LoadJobsList(existingEntries);
}
function LoadJobsList(array) {
    $("#CompletedJobList").html("");
    if (array == null) {
        array = JSON.parse(localStorage.getItem("CompletedList"))
    }

    if (array !== null)
        for (var i = 0 ; i < array.length; i++) {
            $("#CompletedJobList").append(
            "<div data-role=" + "collapsible" + " data-collapsed=" + "false" + ">" + "<h2>" + array[i].title + "</h2>" +
                "<p>" + array[i].text +
                           " <button id=" + "Deletebtn" + " value=" + i + " data-icon=" + "delete" + " onclick=" + "DeleteJob();" + "></button>" +
                            " <button id=" + "Pendingbtn" + " value=" + i + " data-icon=" + "recycle" + " onclick=" + "AddPending();" + "></button>" +
                "</div>");
        }
    
    $("#CompletedJobList").collapsibleset().collapsibleset("refresh");
}
function DeleteJob() {
    id = document.getElementById("Deletebtn").value;
    var currentlist = localStorage.getItem("JobList");
    if (currentlist) { JobList = JSON.parse(currentlist); }
    JobList.splice(id, 1);
    localStorage.setItem("JobList", JSON.stringify(JobList));
    LoadJobsList(JobList);
}
function AddPending() {
    id = document.getElementById("Pendingbtn").value;
    var currentlist = localStorage.getItem("CompletedList");
    if (currentlist) { JobList = JSON.parse(currentlist); }
    var PendingJob = [];
    PendingJob = JobList.splice(id, 1);
    PendingJob.title = currentlist.valueOf("title");
    PendingJob.text = currentlist.valueOf("text");
    localStorage.setItem("CompletedList", JSON.stringify(JobList));
    LoadJobsList(CompletedList);

    var ExsistingPending = JSON.parse(localStorage.getItem("PendingList"));
    if (ExsistingPending == null) ExsistingPending = [];


    ExsistingPending.push(PendingJob);
    localStorage.setItem("PendingList", JSON.stringify(ExsistingPending));
    LoadPendingList(ExsistingPending);
}
function LoadPendingList(array) {
    $("#PendingJobList").html("");
    if (array == null) {
        array = JSON.parse(localStorage.getItem("PendingList"))
    }

    if (array !== null)
        for (var i = 0 ; i < array.length; i++) {
            var obj = array[i];
            for (var l in obj) {
                $("#PendingJobList").append(
               "<div data-role=" + "collapsible" + " data-collapsed=" + "false" + ">" + "<h2>" + obj[l].text + "</h2>" +
                   "<p>" + obj[l].title +
                              " <button id=" + "Deletebtn" + " value=" + i + " data-icon=" + "delete" + " onclick=" + "DeletePending();" + "></button>" +
                   "</div>");
            }
        }
    $("#PendingJobList").collapsibleset("refresh");

}
function DeletePending() {
    id = document.getElementById("Deletebtn").value;
    var currentlist = localStorage.getItem("PendingList");
    if (currentlist) { PendingList = JSON.parse(currentlist); }
    PendingList.splice(id, 1);
    localStorage.setItem("JobList", JSON.stringify(PendingList));
    LoadPendingList(PendingList);
}
function doEmail() {
    var emailAddress = document.getElementById("txtEmail").value;
    if (emailAddress != "") {
        var Emailcurrentlist = JSON.parse(localStorage.getItem("CompletedList"));
        cordova.plugins.email.open("List of Pending Job ", Emailcurrentlist, emailAddress, "", "", true);
        alert("msg sent");
    }
}

/*function SendEmail () {
    
  
   cordova.plugins.email.open({

        to: 'nooraljaberi@yahoo.com',
        subject: 'Greetings',
        body: 'How are you? Nice greetings from Leipzig'
    });
}*/