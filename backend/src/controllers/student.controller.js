const db = require("../models");
const accounts = require("./account.controller");
const Student = db.students;

/*
Đổi, sửa, xóa thông tin cá nhân
fix front end

*/
//Will make studentID auto increment based on the student count at currentYear

// Create a new student
exports.createStudent = (req, res) => {
  // Kiểm tra req. 
  if (!req.body.firstName || !req.body.surName || !req.body.birthday || !req.body.national || !req.body.ethnic
    || !req.body.religion || !req.body.bornAddress || !req.body.citizenCardId || !req.body.currentAddress
    || !req.body.phoneNumber || !req.body.email || !req.body.isEnlisted ||!req.body.gender/* || !req.body.draftDate can be null*/
  ) {
    res.status(400).send({ message: "Some basic info is empty" });
    return;
  }
  if (!req.body.school || !req.body.academyMethod || !req.body.levelOfAcademy || !req.body.schoolYearGroup
    || !req.body.baseClass || !req.body.major || !req.body.startedYear
  ) {
    res.status(400).send({ message: "Some school info is empty" });
    return;
  }
  var year = req.body.startedYear;
  Student
    .countDocuments({ startedYear: year })
    .then(docCount => {
      var id = (String)(year) + (String)(docCount).padStart(4, "0");
      const student = new Student({
        studentID: id,
        firstName: req.body.firstName,
        surName: req.body.surName,
        birthday: req.body.birthday,
        gender: req.body.gender,
        national: req.body.national,
        ethnic: req.body.ethnic,//King        
        religion: req.body.religion,//Dao phat
        bornAddress: req.body.bornAddress,
        homeAddress: req.body.homeAddress,
        citizenCardId: req.body.citizenCardId, //chung minh thu
        currentAddress: req.body.currentAddress,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        fatherPhoneNumber: req.body.fatherPhoneNumber,
        motherPhoneNumber: req.body.motherPhoneNumber,
        isEnlisted: req.body.isEnlisted,
        draftDate: req.body.draftDate,
        school: req.body.school,// UET
        academyMethod: req.body.academyMethod, //chinh quy...a
        levelOfAcademy: req.body.levelOfAcademy, //University, Doctorate
        schoolYearGroup: req.body.schoolYearGroup, //K64,.. ??
        baseClass: req.body.baseClass, //CA-CLC4
        major: req.body.major,//Khoa hoc may tinh
        startedYear: req.body.startedYear,
        GPA: "",
        managedBy: "",
        note: ""
      });
      student
        .save(student)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message: err.message + ", Error when create studentData."
          });
        });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      })
    });
}
exports.createStudentAndRegisterNewAccount = (req, res) => {
  // Kiểm tra req. 
  if (!req.body.firstName || !req.body.surName || !req.body.birthday || !req.body.national || !req.body.ethnic
    || !req.body.religion || !req.body.bornAddress || !req.body.citizenCardId || !req.body.currentAddress
    || !req.body.phoneNumber || !req.body.email || !req.body.isEnlisted /* || !req.body.draftDate can be null*/
  ) {
    res.status(400).send({ message: "Some basic info is empty" });
    return;
  }
  if (!req.body.school || !req.body.academyMethod || !req.body.levelOfAcademy || !req.body.schoolYearGroup
    || !req.body.baseClass || !req.body.major || !req.body.startedYear
  ) {
    res.status(400).send({ message: "Some school info is empty" });
    return;
  }
  var year = req.body.startedYear;
  Student
    .countDocuments({ startedYear: year })
    .then(docCount => {
      var id = (String)(year) + (String)(docCount).padStart(4, "0");
      const student = new Student({
        studentID: id,
        firstName: req.body.firstName,
        surName: req.body.surName,
        birthday: req.body.birthday,
        gender: req.body.gender,
        national: req.body.national,
        ethnic: req.body.ethnic,//King        
        religion: req.body.religion,//Dao phat
        bornAddress: req.body.bornAddress,
        homeAddress: req.body.homeAddress,
        citizenCardId: req.body.citizenCardId, //chung minh thu
        currentAddress: req.body.currentAddress,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        fatherPhoneNumber: req.body.fatherPhoneNumber,
        motherPhoneNumber: req.body.motherPhoneNumber,
        isEnlisted: req.body.isEnlisted,
        draftDate: req.body.draftDate,
        school: req.body.school,// UET
        academyMethod: req.body.academyMethod, //chinh quy...a
        levelOfAcademy: req.body.levelOfAcademy, //University, Doctorate
        schoolYearGroup: req.body.schoolYearGroup, //K64,.. ??
        baseClass: req.body.baseClass, //CA-CLC4
        major: req.body.major,//Khoa hoc may tinh
        startedYear: req.body.startedYear,
        GPA: "",
        managedBy: "",
        note: ""
      });
      accounts.createAccountFromStudent(student);
      student
        .save(student)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message: err.message + ", Error when create studentData."
          });
        });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      })
    });
}
/**
 * 
  input will be like this :
  {
    "studentList" : [ 
      "Insert sudent info json here"
    ]
  }
 */
exports.createMultipleStudent = (req, res) => {
  var studentList = req.body.studentList;
  const forLoop = async _ => {
    // for (var index = 0; index < studentList.length; index++) {      
    //    var stu = studentList[index];
    for await (let stu of studentList) {
      var year = stu.startedYear;
      await Student
        .countDocuments({ "startedYear": year })
        .then(docCount => {
          var id = year + (String)(docCount).padStart(4, "0");
          const student = new Student({
            studentID: id,
            firstName: stu.firstName,
            surName: stu.surName,
            gender: stu.gender,
            birthday: stu.birthday,
            national: stu.national,
            ethnic: stu.ethnic,//King
            religion: stu.religion,//Dao phat
            homeAddress: stu.homeAddress,
            bornAddress: stu.bornAddress,
            citizenCardId: stu.citizenCardId, //chung minh thu
            currentAddress: stu.currentAddress,
            phoneNumber: stu.phoneNumber,
            email: stu.email,
            fatherPhoneNumber: stu.fatherPhoneNumber,
            motherPhoneNumber: stu.motherPhoneNumber,
            isEnlisted: stu.isEnlisted,
            draftDate: stu.draftDate,
            school: stu.school,// UET
            academyMethod: stu.academyMethod, //chinh quy...
            levelOfAcademy: stu.levelOfAcademy, //University, Doctorate
            schoolYearGroup: stu.schoolYearGroup, //K64,.. ??
            baseClass: stu.baseClass, //CA-CLC4
            major: stu.major,//Khoa hoc may tinh
            startedYear: year,
            GPA: "",
            managedBy: "",
            note: ""
          });
          student
            .save(student)
            .catch(err => {
              res.status(500).send({
                message: err.message + ", Error when create studentData."
              });
            });
        });
    }
  }
  forLoop();
  res.send({ message: "successfully added " + studentList.length + " students" });
}
exports.countStudent = (req, res) => {
  const year = req.query.year;
  Student
    .countDocuments({ startedYear: year })
    .then(docCount => {
      res.send(docCount)
    });
};
// Danh sách tất cả hs.
exports.findAll = (req, res) => {
  Student.find()
    .sort({ "firstName": 1 })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error."
      });
    });
};
exports.findAllToStudentList = (req, res) => {
  const mode = req.params.mode;
  var condition
    = (mode == "good") ? {
      "GPA": { $gt: 3.6 }
    } : (mode == "bad" ? {
      "GPA": { $lt: 2 }
    } : {})
  Student.find(condition,
    {
      _id: 0, "studentID": 1, "surName": 1, "firstName": 1,
      "birthday": 1, "major": 1, "baseClass": 1, "GPA": 1
    })
    .sort({ "firstName": 1 })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error."
      });
    });
};
// not working
exports.findRange = (req, res) => {
  const page = req.query.page;
  const range = req.query.range;

  Student.find(/* $range: {(page - 1) * range, page * range, 1} */)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error."
      });
    });
};
exports.updateDatabaseGPA = (req, res) => {
  const ClassRecord = require("./classRecord.controller");
  const step = async _ => {
    var studentIdList = await Student.find({}, {
      "studentID": 1, "GPA": 1, _id: 0
    });
    for await (let stu of studentIdList) {
      var GPA = await ClassRecord.getGPAof(stu.studentID).catch();

      await Student
        .updateOne({ "studentID": stu.studentID }, { "$set": { "GPA": GPA } })
        .catch(err => {
        })
        ;
    }
  }
  step()
    .then(() => {
      console.log("Finised updating GPA");

      res.send("Finised updating GPA");
    })
}
exports.getAllClass = (req, res) => {
  Student.find()
    .distinct('baseClass')
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send(err);
    })
}
exports.findStudentsFromClass = (req, res) => {
  const baseClass = req.params.baseClass;

  Student.find({ "baseClass": baseClass })
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found students in class " + baseClass });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving student with baseClass=" + baseClass });
    });
};
exports.findByID = (req, res) => {
  const studentID = req.params.studentID;
  Student.find({ "studentID": studentID })
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found student with id " + studentID });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving student with id=" + studentID });
    });
};
exports.findByMod = (req, res) => {
  const managedBy = req.params.managedBy;
  Student.find({ "managedBy": managedBy })
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found student managed by user " + managedBy });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving managed by user=" + managedBy });
    });
};
exports.findByYear = (req, res) => {
  const startedYear = req.params.startedYear;

  Student.find({ "startedYear": startedYear })
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found student with id " + startedYear });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving student with id=" + startedYear });
    });
};
// Update a student by the studentID in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const studentID = req.params.studentID;

  Student.findByIdAndUpdate(studentID, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot find student to update  with studentID=${studentID}!`
        });
      } else res.send({ message: "Student info was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating student with studentID=" + studentID
      });
    });
};

exports.deleteWithID = (req, res) => {
  const studentID = req.params.studentID;
  Student.deleteMany({ "studentID": studentID })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Student with studentID=${studentID}!`
        });
      } else {
        res.send({
          message: "Student was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message + "Could not delete Student with studentID=" + studentID
      });
    });
};
exports.deleteWithFirstname = (req, res) => {
  const firstName = req.params.firstName;

  Student.findByIdAndRemove(firstName, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Student with firstName=${firstName}!`
        });
      } else {
        res.send({
          message: "Student was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err + "Could not delete Student with firstName=" + firstName
      });
    });
};
exports.deleteAll = (req, res) => {
  Student.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} All student info were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Student."
      });
    });
};

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Account = db.accounts;

function dateToPassword(date) {
  date = date.split("-");
  date = date.join("");
  return date;
}

function randomAvatarColor() {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
}

exports.generateStudentAccount = (req, res) => {
  const step = async _ => {
    var studentIdList = Student.find({}, {
      "studentID": 1, "birthday": 1, "firstName": 1, "surName": 1, "email": 1, _id: 0
    });
    for await (const student of studentIdList) {

      const account = new Account({
        username: student.studentID,
        password: bcrypt.hashSync(dateToPassword(student.birthday), 10),
        firstName: student.firstName,
        surName: student.surName,
        email: student.email,
        messageOn: false,
        isStudent: true,
        avatarColor: randomAvatarColor(),
        notification: [],
        authorityLevel: ""
      });

      account
        .save(account)
        .then(data => {
          console.log(data);

        })
        .catch(err => {
          console.log("Error when create data");

        });
    }
  }
  step()
    .then(() => {
      res.send("finished");

    })
  res.send("finished");

};