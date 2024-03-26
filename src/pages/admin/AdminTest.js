import React from "react";
import theme from "../../../trc/theme/theme";
import FullLayout from "../../../trc/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import Box from "@mui/material/Box";
import toast, { Toaster } from "react-hot-toast";
import Modal from "@mui/material/Modal";
import { IoMdCloseCircle } from "react-icons/io";
import Spinner from "../components/Spinner";
import Head from "next/head";
import { set } from "mongoose";
const Myaccount = () => {
  //for modals start here
  const [width, setWidth] = useState(0);
  const [open, setOpen] = useState(false);
  const [openUpdateQuestion, setOpenUpdateQuestion] = useState(false);
  const [openQuestion, setOpenQuestion] = useState(false);
  const [testData, setTestData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [questionData, setQuestionData] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTestUpdate(false);
  };
  const handleOpenQuestion = () => setOpenQuestion(true);
  const handleCloseQuestion = () => {
    setOpenQuestion(false);
    setIsUpdate(false);
  };
  const handleOpenUpdateQuestion = () => setOpenUpdateQuestion(true);
  const handleCloseUpdateQuestion = () => {
    setOpenUpdateQuestion(false);
  };
  //fetching all tetsts start here
  const fetchAllTests = async () => {
    setLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/Test/testopt`,
      {
        method: "GET", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await res.json();
    setLoading(false);
    setTestData(result.tests);
  };
  //fetching all test questions
  const fetchAllQuestions = async () => {
    setLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/Test/testquestion`,
      {
        method: "GET", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await res.json();
    setLoading(false);
    setQuestionData(result.data);
  };
  //fetching all tests end here
  useEffect(() => {
    var w = window.innerWidth;
    if (w >= 500) {
      setWidth(800);
    } else {
      setWidth(350);
    }
    fetchAllTests();
    fetchAllQuestions();
  }, []);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { width },
    bgcolor: "background.paper",
    border: "2px solid purple",
    boxShadow: 24,
    borderRadius: "6px",
    p: 4,
  };
  //for modals end here
  //add test states start here
  const [testname, setTestName] = useState("");
  const [testype, setTestType] = useState("");
  const [testdate, setTestDate] = useState("");
  const [time, setTime] = useState("");
  const [testRegCount, setTestRegCount] = useState("");
  const [testtitle, setTestTitle] = useState("");
  const [testdescription, setTestDescription] = useState("");
  const [testbenefits, setTestBenefits] = useState([]);
  const [testbchild, setTestBChild] = useState("");
  const [testEndDate,setTestEndDate] = useState("");
  const [testEndTime,setTestEndTime] = useState("");
  const [testactualenddate,setTestActualEndDate] = useState("");
  const [actualTestDate, setActualTestDate] = useState("");
  const [testUpdate, setTestUpdate] = useState(false);
  const [id, setId] = useState("");
  const [testQuestionName, setTestQuestionName] = useState("");
  const [testQuestionId, setTestQuestionId] = useState("");
  const [testQuestion1, setTestQuestion1] = useState([]);
  const [testQuestion2, setTestQuestion2] = useState([]);
  const [testQuestion3, setTestQuestion3] = useState([]);
  const [testQuestion4, setTestQuestion4] = useState([]);
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [answer, setAnswer] = useState("");
  const [currentIndex, SetCurrentIndex] = useState(0);
  const [updateStage, setUpdateStage] = useState(1);
  const [isUpdate, setIsUpdate] = useState(false);
  const handleChange = (e) => {
    if (e.target.name == "testname") {
      setTestName(e.target.value);
    } else if (e.target.name == "testtype") {
      setTestType(e.target.value);
    } else if (e.target.name == "testdate") {
      setTestDate(e.target.value);
      setActualTestDate(e.target.value + "T" + time + ":00");
    } else if (e.target.name == "testtitle") {
      setTestTitle(e.target.value);
    } else if (e.target.name == "testdescription") {
      setTestDescription(e.target.value);
    } else if (e.target.name == "time") {
      setTime(e.target.value);
      console.log(time);
      setActualTestDate(testdate + "T" + e.target.value + ":00");
    } else if (e.target.name == "testbenefits") {
      setTestBChild(e.target.value);
    } else if (e.target.name == "testQuestionName") {
      setTestQuestionName(e.target.value);
    } else if (e.target.name == "testQuestionId") {
      setTestQuestionId(e.target.value);
    } else if (e.target.name == "question") {
      setQuestion(e.target.value);
    } else if (e.target.name == "option1") {
      setOption1(e.target.value);
    } else if (e.target.name == "option2") {
      setOption2(e.target.value);
    } else if (e.target.name == "option3") {
      setOption3(e.target.value);
    } else if (e.target.name == "option4") {
      setOption4(e.target.value);
    } else if (e.target.name == "answer") {
      setAnswer(e.target.value);
    }
    else if(e.target.name=="testEndDate"){
      setTestEndDate(e.target.value);
      setTestActualEndDate(e.target.value + "T" + testEndTime + ":00");
    }
    else if(e.target.name=="testEndTime"){
      setTestEndTime(e.target.value);
      setTestActualEndDate(testEndDate + "T" + e.target.value + ":00");
    }
  };
  //add test states end here
  //test benefits pushing into array start here
  const handleTestBenefits = () => {
    setTestBenefits([...testbenefits, testbchild]);
    setTestBChild("");
  };
  const handleRemoveTestBenefits = (index) => {
    const newTestBenefits = [...testbenefits];
    newTestBenefits.splice(index, 1);
    setTestBenefits(newTestBenefits);
  };
  //addevent states end here
  const handleAddEvent = async () => {
    setActualTestDate(testdate + "T" + time + ":00");
    setLoading(true);
    let data = {
      testname,
      testtype: testype,
      testdate: actualTestDate,
      testenddate:testactualenddate,
      time,
      testtitle,
      testdescription,
      testbenefits,
      status: "addTest",
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/Test/testopt`,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await res.json();
    console.log(result);
    setLoading(false);
    if (result.success) {
      toast.success(result.message);
      setTestName("");
      setTestType("");
      setTestDate("");
      setTime("");
      setTestTitle("");
      setTestDescription("");
      setTestBenefits([]);
      setActualTestDate("");
      setTestBChild("");
      handleClose();
      fetchAllTests();
    } else {
      toast.error(result.message);
    }
  };
  //delete test start here
  const handleDeleteTest = async (id) => {
    setLoading(true);
    let a = confirm("Are you sure you want to delete this test?");
    if (!a) {
      setLoading(false);
      return;
    } else {
      let data = { status: "deleteTest", id };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/Test/testopt`,
        {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await res.json();
      setLoading(false);
      if (result.success) {
        toast.success(result.message);
        fetchAllTests();
      } else {
        toast.error(result.message);
      }
    }
  };
  //delete test end here
  //updateStarts Here
  const update = (item) => {
    setTestUpdate(true);
    setTestName(item.testname);
    setTestType(item.testtype);
    setTestDate(item.testdate.slice(0, 10));
    setTime(item.testdate.slice(11, 16));
    setTestEndDate(item.testenddate.slice(0, 10));
    setTestEndTime(item.testenddate.slice(11, 16));
    setTestTitle(item.testtitle);
    setTestDescription(item.testdescription);
    setTestBenefits(item.testbenefits);
    setActualTestDate(item.testdate);
    setTestActualEndDate(item.testenddate);
    setId(item._id);
    handleOpen();
  };
  const handleUpdateTest = async () => {
    setActualTestDate(testdate + "T" + time + ":00");
    setLoading(true);
    let data = {
      testname,
      testtype: testype,
      testdate: actualTestDate,
      testenddate:testactualenddate,
      time,
      testtitle,
      testdescription,
      testbenefits,
      status: "updateTest",
      id,
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/Test/testopt`,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await res.json();
    console.log(result);
    setLoading(false);
    if (result.success) {
      toast.success(result.message);
      setTestName("");
      setTestType("");
      setTestDate("");
      setTime("");
      setTestTitle("");
      setTestDescription("");
      setTestBenefits([]);
      setTestBChild("");
      setActualTestDate("");
      setId("");
      fetchAllTests();
      handleClose();
    } else {
      toast.error(result.message);
    }
  };
  //add question
  const handleAddQuestion = () => {
    setTestQuestion1([
      ...testQuestion1,
      {
        question: question,
        option1: option1,
        option2: option2,
        option3: option3,
        option4: option4,
        answer: answer,
      },
    ]);
    setQuestion("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setAnswer("");
  };
  //remove question
  const handleRemoveQuestion = (index) => {
    let confirmation = confirm(
      "Are you sure you want to delete this question?"
    );
    if (confirmation) {
      const newQuestion = [...testQuestion1];
      newQuestion.splice(index, 1);
      setTestQuestion1(newQuestion);
    }
  };
  //update question modal control
  const handleUpdateQuestion = (index) => {
    setUpdateStage(1);
    SetCurrentIndex(index);
    handleOpenUpdateQuestion();
    setQuestion(testQuestion1[index].question);
    setOption1(testQuestion1[index].option1);
    setOption2(testQuestion1[index].option2);
    setOption3(testQuestion1[index].option3);
    setOption4(testQuestion1[index].option4);
    setAnswer(testQuestion1[index].answer);
  };
  //update question
  const handleUpdateQuestionArray = () => {
    const newQuestion = [...testQuestion1];
    newQuestion[currentIndex].question = question;
    newQuestion[currentIndex].option1 = option1;
    newQuestion[currentIndex].option2 = option2;
    newQuestion[currentIndex].option3 = option3;
    newQuestion[currentIndex].option4 = option4;
    newQuestion[currentIndex].answer = answer;
    setTestQuestion1(newQuestion);
    handleCloseUpdateQuestion();
    SetCurrentIndex(0);
    setQuestion("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setAnswer("");
  };
  //add question satge2
  const handleAddQuestionStage2 = () => {
    setTestQuestion2([
      ...testQuestion2,
      {
        question: question,
        option1: option1,
        option2: option2,
        option3: option3,
        option4: option4,
        answer: answer,
      },
    ]);
    setQuestion("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setAnswer("");
  };
  //remove question
  const handleRemoveQuestionStage2 = (index) => {
    let confirmation = confirm(
      "Are you sure you want to delete this question?"
    );
    if (confirmation) {
      const newQuestion = [...testQuestion2];
      newQuestion.splice(index, 1);
      setTestQuestion2(newQuestion);
    }
  };
  //update question modal control
  const handleUpdateQuestionStage2 = (index) => {
    setUpdateStage(2);
    SetCurrentIndex(index);
    handleOpenUpdateQuestion();
    setQuestion(testQuestion2[index].question);
    setOption1(testQuestion2[index].option1);
    setOption2(testQuestion2[index].option2);
    setOption3(testQuestion2[index].option3);
    setOption4(testQuestion2[index].option4);
    setAnswer(testQuestion2[index].answer);
  };
  //update question
  const handleUpdateQuestionArrayStage2 = () => {
    const newQuestion = [...testQuestion2];
    newQuestion[currentIndex].question = question;
    newQuestion[currentIndex].option1 = option1;
    newQuestion[currentIndex].option2 = option2;
    newQuestion[currentIndex].option3 = option3;
    newQuestion[currentIndex].option4 = option4;
    newQuestion[currentIndex].answer = answer;
    setTestQuestion2(newQuestion);
    handleCloseUpdateQuestion();
    SetCurrentIndex(0);
    setQuestion("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setAnswer("");
    setUpdateStage(1);
  };
  //add question satge3
  const handleAddQuestionStage3 = () => {
    setTestQuestion3([
      ...testQuestion3,
      {
        question: question,
      },
    ]);
    setQuestion("");
  };
  //remove question
  const handleRemoveQuestionStage3 = (index) => {
    let confirmation = confirm(
      "Are you sure you want to delete this question?"
    );
    if (confirmation) {
      const newQuestion = [...testQuestion3];
      newQuestion.splice(index, 1);
      setTestQuestion3(newQuestion);
    }
  };
  //update question modal control
  const handleUpdateQuestionStage3 = (index) => {
    setUpdateStage(3);
    SetCurrentIndex(index);
    handleOpenUpdateQuestion();
    setQuestion(testQuestion3[index].question);
  };
  //update question
  const handleUpdateQuestionArrayStage3 = () => {
    const newQuestion = [...testQuestion3];
    newQuestion[currentIndex].question = question;
    setTestQuestion3(newQuestion);
    handleCloseUpdateQuestion();
    SetCurrentIndex(0);
    setQuestion("");

    setUpdateStage(1);
  };
  //add question satge4
  const handleAddQuestionStage4 = () => {
    setTestQuestion4([
      ...testQuestion4,
      {
        question: question,
      },
    ]);
    setQuestion("");
  };
  //remove question
  const handleRemoveQuestionStage4 = (index) => {
    let confirmation = confirm(
      "Are you sure you want to delete this question?"
    );
    if (confirmation) {
      const newQuestion = [...testQuestion4];
      newQuestion.splice(index, 1);
      setTestQuestion4(newQuestion);
    }
  };
  //update question modal control
  const handleUpdateQuestionStage4 = (index) => {
    setUpdateStage(4);
    SetCurrentIndex(index);
    handleOpenUpdateQuestion();
    setQuestion(testQuestion4[index].question);
  };
  //update question
  const handleUpdateQuestionArrayStage4 = () => {
    const newQuestion = [...testQuestion4];
    newQuestion[currentIndex].question = question;
    setTestQuestion4(newQuestion);
    handleCloseUpdateQuestion();
    SetCurrentIndex(0);
    setQuestion("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setAnswer("");
    setUpdateStage(1);
  };
  const handleSubmitQuestion = async () => {
    setLoading(true);
    const data = {
      question1: testQuestion1,
      question2: testQuestion2,
      question3: testQuestion3,
      question4: testQuestion4,
      status: "add",
      testname: testQuestionName,
      testid: testQuestionId,
    };
    console.log(data);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/Test/testquestion`,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await res.json();
    setLoading(false);
    if (result.success) {
      toast.success(result.message);
      setTestQuestion1([]);
      setTestQuestion2([]);
      setTestQuestion3([]);
      setTestQuestion4([]);
      setTestQuestionName("");
      setTestQuestionId("");
      fetchAllQuestions();
      handleCloseQuestion();
    } else {
      toast.error(result.message);
    }
  };
  //update test question function starts here
  //update modal starts here
  const handleUpdateModal = (item, id) => {
    setIsUpdate(true);
    setId(id);
    setTestQuestion1(item.question1);
    setTestQuestion2(item.question2);
    setTestQuestion3(item.question3);
    setTestQuestion4(item.question4);
    setTestQuestionName(item.testname);
    setTestQuestionId(item.testid);
    handleOpenQuestion();
  };
  //update modal ends here
  //update test question function ends here
  const handleUpdateQuestionModal = async () => {
    setLoading(true);
    const data = {
      question1: testQuestion1,
      question2: testQuestion2,
      question3: testQuestion3,
      question4: testQuestion4,
      status: "update",
      testname: testQuestionName,
      testid: testQuestionId,
      id: id,
    };
    console.log(data);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/Test/testquestion`,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await res.json();
    setLoading(false);
    if (result.success) {
      toast.success(result.message);
      setTestQuestion1([]);
      setTestQuestion2([]);
      setTestQuestion3([]);
      setTestQuestion4([]);
      setTestQuestionName("");
      setTestQuestionId("");
      setId("");
      fetchAllQuestions();
      handleCloseQuestion();
    } else {
      toast.error(result.message);
    }
  };
  //delete test question function starts here
  const deleteQuestion = async (id) => {
    let confirmation = confirm(
      "Are you sure you want to delete this question?"
    );
    if (confirmation) {
      setLoading(true);
      const data = { status: "delete", id };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/Test/testquestion`,
        {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await res.json();
      setLoading(false);
      if (result.success) {
        toast.success(result.message);
        fetchAllQuestions();
      } else {
        toast.error(result.message);
      }
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <FullLayout>
        <Toaster position="top-center" />
        <style jsx global>{`
          #footer {
            display: none;
          }
          #navbar {
            display: none;
          }
        `}</style>
        <Head>
          <title>Admin | Add Test and mange all the tests</title>
          <meta
            name="description"
            content="Admin | Add Test and mange all the tests"
          />
        </Head>
        {loading ? (
          <div className="min-h-screen flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <>
            <section>
              <>
                {/* Table Section */}
                <div className="max-w-[85rem] px-4 py-4 sm:px-6 lg:px-8 lg:py-4 mx-auto">
                  {/* Card */}
                  <div className="flex flex-col">
                    <div className="-m-1.5 overflow-x-auto">
                      <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
                          {/* Header */}
                          <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
                            <div>
                              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 navfont">
                                All Tests - Manage all the tests
                              </h2>
                            </div>
                            <div>
                              <div className="inline-flex gap-x-2">
                                <a
                                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                  href="#"
                                >
                                  View all
                                </a>
                                <button
                                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                  onClick={handleOpen}
                                >
                                  <svg
                                    className="flex-shrink-0 size-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M5 12h14" />
                                    <path d="M12 5v14" />
                                  </svg>
                                  Create
                                </button>
                              </div>
                            </div>
                          </div>
                          {/* End Header */}
                          {/* Table */}
                          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-slate-900">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-start"
                                >
                                  <div className="flex items-center gap-x-2">
                                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                      Test Name
                                    </span>
                                  </div>
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-start"
                                >
                                  <div className="flex items-center gap-x-2">
                                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                      Test Type
                                    </span>
                                  </div>
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-start"
                                >
                                  <div className="flex items-center gap-x-2">
                                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                      Test Date
                                    </span>
                                  </div>
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-start"
                                >
                                  <div className="flex items-center gap-x-2">
                                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                      Test Time
                                    </span>
                                  </div>
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-start"
                                >
                                  <div className="flex items-center gap-x-2">
                                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                      Test Status
                                    </span>
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                              {testData &&
                                testData.map((item) => (
                                  <tr key={item._id}>
                                    <td className="size-px whitespace-nowrap">
                                      <div className="px-6 py-2">
                                        <div className="flex items-center gap-x-2">
                                          <div className="grow">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                              {item.testname}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="size-px whitespace-nowrap">
                                      <div className="px-6 py-2">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                          {item.testtype}
                                        </span>
                                      </div>
                                    </td>
                                    <td className="size-px whitespace-nowrap">
                                      <div className="px-6 py-2">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                          {item.testdate.slice(0, 10)}
                                        </span>
                                      </div>
                                    </td>
                                    <td className="size-px whitespace-nowrap">
                                      <div className="px-6 py-2">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                          {item.testdate.slice(11, 16)}
                                        </span>
                                      </div>
                                    </td>
                                    <td className="size-px whitespace-nowrap">
                                      <div className="px-6 py-2 flex gap-x-1">
                                        <button
                                          className="px-2 py-2 bg-green-600 mx-2 my-2 text-sm navfont text-white rounded"
                                          onClick={() => {
                                            update(item);
                                          }}
                                        >
                                          Update
                                        </button>
                                        <button
                                          className="px-2 py-2 bg-red-600 mx-2 my-2 text-sm navfont text-white rounded"
                                          onClick={() => {
                                            handleDeleteTest(item._id);
                                          }}
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                          {/* End Table */}
                          {/* Footer */}
                          <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-gray-700">
                            <div className="inline-flex items-center gap-x-2">
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Showing:
                              </p>

                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {testData.length} of {testData.length}
                              </p>
                            </div>
                            <div>
                              <div className="inline-flex gap-x-2">
                                <button
                                  type="button"
                                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                >
                                  <svg
                                    className="flex-shrink-0 size-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="m15 18-6-6 6-6" />
                                  </svg>
                                  Prev
                                </button>
                                <button
                                  type="button"
                                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                >
                                  Next
                                  <svg
                                    className="flex-shrink-0 size-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="m9 18 6-6-6-6" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                          {/* End Footer */}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* End Card */}
                </div>
                {/* End Table Section */}
              </>
              <section>
                <>
                  {/* Table Section */}
                  <div className="max-w-[85rem] px-4 py-4 sm:px-6 lg:px-8 lg:py-4 mx-auto">
                    {/* Card */}
                    <div className="flex flex-col">
                      <div className="-m-1.5 overflow-x-auto">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
                            {/* Header */}
                            <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
                              <div>
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 navfont">
                                  All Questions - Manage all the questions
                                </h2>
                              </div>
                              <div>
                                <div className="inline-flex gap-x-2">
                                  <a
                                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                    href="#"
                                  >
                                    View all
                                  </a>
                                  <button
                                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                    onClick={handleOpenQuestion}
                                  >
                                    <svg
                                      className="flex-shrink-0 size-4"
                                      xmlns="http://www.w3.org/2000/svg"
                                      width={24}
                                      height={24}
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <path d="M5 12h14" />
                                      <path d="M12 5v14" />
                                    </svg>
                                    Create
                                  </button>
                                </div>
                              </div>
                            </div>
                            {/* End Header */}
                            {/* Table */}
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                              <thead className="bg-gray-50 dark:bg-slate-900">
                                <tr>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-start"
                                  >
                                    <div className="flex items-center gap-x-2">
                                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                        Test Name
                                      </span>
                                    </div>
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-start"
                                  >
                                    <div className="flex items-center gap-x-2">
                                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                        Test Id
                                      </span>
                                    </div>
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-start"
                                  >
                                    <div className="flex items-center gap-x-2">
                                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                        Test CreatedAt
                                      </span>
                                    </div>
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-start"
                                  >
                                    <div className="flex items-center gap-x-2">
                                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                        Test UpdatedAt
                                      </span>
                                    </div>
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {questionData &&
                                  questionData.map((item) => (
                                    <tr key={item._id}>
                                      <td className="size-px whitespace-nowrap">
                                        <div className="px-6 py-2">
                                          <div className="flex items-center gap-x-2">
                                            <div className="grow">
                                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                                {item.testname}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="size-px whitespace-nowrap">
                                        <div className="px-6 py-2">
                                          <span className="text-sm text-gray-600 dark:text-gray-400">
                                            {item.testid}
                                          </span>
                                        </div>
                                      </td>
                                      <td className="size-px whitespace-nowrap">
                                        <div className="px-6 py-2">
                                          <span className="text-sm text-gray-600 dark:text-gray-400">
                                            {new Date(
                                              item.createdAt
                                            ).toLocaleDateString("en-IN", {
                                              weekday: "long",
                                              year: "numeric",
                                              month: "long",
                                              day: "numeric",
                                            })}
                                          </span>
                                        </div>
                                      </td>
                                      <td className="size-px whitespace-nowrap">
                                        <div className="px-6 py-2">
                                          <span className="text-sm text-gray-600 dark:text-gray-400">
                                            {new Date(
                                              item.updatedAt
                                            ).toLocaleDateString("en-IN", {
                                              weekday: "long",
                                              year: "numeric",
                                              month: "long",
                                              day: "numeric",
                                            })}
                                          </span>
                                        </div>
                                      </td>
                                      <td className="size-px whitespace-nowrap">
                                        <div className="px-6 py-2 flex gap-x-1">
                                          <button
                                            className="px-2 py-2 bg-green-600 mx-2 my-2 text-sm navfont text-white rounded"
                                            onClick={() => {
                                              handleUpdateModal(item, item._id);
                                            }}
                                          >
                                            Update
                                          </button>
                                          <button
                                            className="px-2 py-2 bg-red-600 mx-2 my-2 text-sm navfont text-white rounded"
                                            onClick={() => {
                                              deleteQuestion(item._id);
                                            }}
                                          >
                                            Delete
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                            {/* End Table */}
                            {/* Footer */}
                            <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-gray-700">
                              <div className="inline-flex items-center gap-x-2">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Showing:
                                </p>

                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {questionData.length} of {questionData.length}
                                </p>
                              </div>
                              <div>
                                <div className="inline-flex gap-x-2">
                                  <button
                                    type="button"
                                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                  >
                                    <svg
                                      className="flex-shrink-0 size-4"
                                      xmlns="http://www.w3.org/2000/svg"
                                      width={24}
                                      height={24}
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <path d="m15 18-6-6 6-6" />
                                    </svg>
                                    Prev
                                  </button>
                                  <button
                                    type="button"
                                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                  >
                                    Next
                                    <svg
                                      className="flex-shrink-0 size-4"
                                      xmlns="http://www.w3.org/2000/svg"
                                      width={24}
                                      height={24}
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <path d="m9 18 6-6-6-6" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>
                            {/* End Footer */}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* End Card */}
                  </div>
                  {/* End Table Section */}
                </>
              </section>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <div
                    className="absolute top-2 right-2 text-purple-600"
                    onClick={handleClose}
                  >
                    <IoMdCloseCircle className="text-4xl" />
                  </div>
                  <div className="m-2 w-full px-4 lg:px-8 py-4 mx-auto overflow-scroll max-h-[80vh]">
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
                      <h2 className="text-stone-700 text-xl font-bold">
                        Add a New Test
                      </h2>
                      <p className="mt-1 text-sm">Add a new test to the list</p>
                      <div className="mt-8">
                        <div className="flex flex-col">
                          <label
                            htmlFor="status"
                            className="text-stone-600 text-sm font-medium"
                          >
                            Test Name
                          </label>
                          <input
                            id="status"
                            name="testname"
                            type="text"
                            value={testname}
                            onChange={handleChange}
                            className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                        <div className="flex flex-col my-2">
                          <label
                            htmlFor="status"
                            className="text-stone-600 text-sm font-medium"
                          >
                            Test Date
                          </label>
                          <input
                            id="status"
                            name="testdate"
                            value={testdate}
                            type="date"
                            onChange={handleChange}
                            className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 "
                          />
                        </div>
                        <div className="flex flex-col my-2">
                          <label
                            htmlFor="status"
                            className="text-stone-600 text-sm font-medium"
                          >
                            Test Time
                          </label>
                          <input
                            id="status"
                            name="time"
                            value={time}
                            type="time"
                            onChange={handleChange}
                            className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 "
                          />
                        </div>
                        <div className="flex flex-col my-2">
                          <label
                            htmlFor="status"
                            className="text-stone-600 text-sm font-medium"
                          >
                            Test End Date
                          </label>
                          <input
                            id="status"
                            name="testEndDate"
                            value={testEndDate}
                            type="date"
                            onChange={handleChange}
                            className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 "
                          />
                        </div>
                        <div className="flex flex-col my-2">
                          <label
                            htmlFor="status"
                            className="text-stone-600 text-sm font-medium"
                          >
                            Test End Time
                          </label>
                          <input
                            id="status"
                            name="testEndTime"
                            value={testEndTime}
                            type="time"
                            onChange={handleChange}
                            className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 "
                          />
                        </div>

                        <div className="flex flex-col my-2">
                          <label
                            htmlFor="status"
                            className="text-stone-600 text-sm font-medium"
                          >
                            Test Type
                          </label>
                          <select
                            id="status"
                            name="testtype"
                            value={testype}
                            onChange={handleChange}
                            className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 "
                          >
                            <option>Select</option>
                            <option value="online">Online</option>
                            <option value="offline">Offline</option>
                          </select>
                        </div>
                      </div>
                      <div className="mt-8 ">
                        <div className="flex flex-col">
                          <label
                            htmlFor="status"
                            className="text-stone-600 text-sm font-medium"
                          >
                            Test Title for About
                          </label>
                          <input
                            id="status"
                            name="testtitle"
                            type="text"
                            value={testtitle}
                            onChange={handleChange}
                            className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 my-2"
                          />
                        </div>
                        <label
                          htmlFor="status"
                          className="text-stone-600 text-sm font-medium"
                        >
                          Test Benefits
                        </label>
                        <div className="flex ">
                          <input
                            id="status"
                            name="testbenefits"
                            type="text"
                            value={testbchild}
                            onChange={handleChange}
                            className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 my-2"
                          />

                          <button
                            className="px-2 py-2 bg-green-600 mx-2 my-2 text-sm navfont text-white rounded w-28 "
                            onClick={handleTestBenefits}
                          >
                            Add
                          </button>
                        </div>
                        {testbenefits.map((item, index) => (
                          <ul
                            key={index}
                            className="bg-green-200 rounded p-4 my-2 flex items-center justify-between"
                          >
                            <li className="navfont">{item}</li>
                            <IoCloseSharp
                              className="text-xl text-black "
                              onClick={() => {
                                handleRemoveTestBenefits(index);
                              }}
                            />
                          </ul>
                        ))}
                      </div>

                      <div className="mt-8 ">
                        <div className="flex flex-col">
                          <label
                            htmlFor="status"
                            className="text-stone-600 text-sm font-medium"
                          >
                            Test Description
                          </label>
                          <textarea
                            id="status"
                            name="testdescription"
                            onChange={handleChange}
                            value={testdescription}
                            className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            rows="3"
                            cols="10"
                          ></textarea>
                        </div>
                      </div>
                      <div className="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex">
                        <button
                          className="active:scale-95 rounded-lg bg-gray-200 px-8 py-2 font-medium text-gray-600 outline-none focus:ring hover:opacity-90 navfont"
                          onClick={handleClose}
                        >
                          Cancel
                        </button>
                        {!testUpdate && (
                          <button
                            className="active:scale-95 rounded-lg bg-blue-600 px-8 py-2 font-medium text-white outline-none focus:ring hover:opacity-90 navfont"
                            onClick={handleAddEvent}
                          >
                            Add Test
                          </button>
                        )}
                        {testUpdate && (
                          <button
                            className="active:scale-95 rounded-lg bg-green-600 px-8 py-2 font-medium text-white outline-none focus:ring hover:opacity-90 navfont"
                            onClick={handleUpdateTest}
                          >
                            Update Test
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </Box>
              </Modal>
              {/* modal for questions */}
              <Modal
                open={openQuestion}
                onClose={handleCloseQuestion}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <div
                    className="absolute top-2 right-2 text-purple-600"
                    onClick={handleCloseQuestion}
                  >
                    <IoMdCloseCircle className="text-4xl" />
                  </div>
                  <div className="m-2 w-full px-4 lg:px-8 py-4 mx-auto overflow-scroll max-h-[80vh]">
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
                      <h2 className="text-black text-xl font-bold navfont">
                        Create Questions for the test
                      </h2>
                      <p className="mt-1 text-sm navfont">
                        You can create maximum 4 sets of question and minimun 1
                        sets of question.
                      </p>
                      <div className="mt-8">
                        <div className="flex flex-col">
                          <label
                            htmlFor="status"
                            className="text-stone-600 text-sm font-medium navfont"
                          >
                            Test Name
                          </label>
                          <select
                            id="status"
                            name="testQuestionName"
                            value={testQuestionName}
                            onChange={handleChange}
                            className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 "
                          >
                            <option>Select</option>
                            {testData.map((item) => (
                              <option value={item.testname} key={item._id}>
                                {item.testname}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="flex flex-col my-2">
                          <label
                            htmlFor="status"
                            className="text-stone-600 text-sm font-medium navfont"
                          >
                            Test Id
                          </label>
                          <select
                            id="status"
                            name="testQuestionId"
                            value={testQuestionId}
                            onChange={handleChange}
                            className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 "
                          >
                            <option>Select</option>
                            {testData.map((item) => (
                              <option value={item._id} key={item._id}>
                                {item.testname} - {item._id}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="mt-8 ">
                        <h1 className="navfont font-bold text-xl">
                          Question Stage 1
                        </h1>

                        <div className="flex flex-col my-2">
                          <label
                            htmlFor="status"
                            className="text-stone-600 text-sm font-medium navfont"
                          >
                            Add Stage 1 Questions
                          </label>
                          <input
                            id="status"
                            name="question"
                            type="text"
                            value={question}
                            onChange={handleChange}
                            className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 my-2"
                            placeholder="Enter the question"
                          />
                          <div className="flex flex-wrap">
                            <div className="mx-2">
                              <label
                                htmlFor="status"
                                className="text-stone-600 text-sm font-medium navfont"
                              >
                                Option A.
                              </label>
                              <input
                                id="status"
                                name="option1"
                                type="text"
                                value={option1}
                                onChange={handleChange}
                                className="mt-2 block rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 my-2 w-72"
                                placeholder="Enter the option A answer"
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="status"
                                className="text-stone-600 text-sm font-medium navfont"
                              >
                                Option B.
                              </label>
                              <input
                                id="status"
                                name="option2"
                                type="text"
                                value={option2}
                                onChange={handleChange}
                                className="mt-2 block rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 my-2 w-72"
                                placeholder="Enter the option B answer"
                              />
                            </div>
                            <div className="mx-2">
                              <label
                                htmlFor="status"
                                className="text-stone-600 text-sm font-medium navfont"
                              >
                                Option C.
                              </label>
                              <input
                                id="status"
                                name="option3"
                                type="text"
                                value={option3}
                                onChange={handleChange}
                                className="mt-2 block rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 my-2 w-72"
                                placeholder="Enter the option C answer"
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="status"
                                className="text-stone-600 text-sm font-medium navfont"
                              >
                                Option D.
                              </label>
                              <input
                                id="status"
                                name="option4"
                                type="text"
                                value={option4}
                                onChange={handleChange}
                                className="mt-2 block rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 my-2 w-72"
                                placeholder="Enter the option D answer"
                              />
                            </div>
                            <div className="w-full">
                              <label
                                htmlFor="status"
                                className="text-stone-600 text-sm font-medium navfont"
                              >
                                Answer
                              </label>
                              <select
                                id="status"
                                name="answer"
                                value={answer}
                                onChange={handleChange}
                                className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 "
                              >
                                <option>Select</option>
                                <option value="option1">Option A</option>
                                <option value="option2">Option B</option>
                                <option value="option3">Option C</option>
                                <option value="option4">Option D</option>
                              </select>
                            </div>
                            <button
                              className="p-3 m-2 mavfont bg-green-600 rounded font-bold text-white w-full"
                              onClick={handleAddQuestion}
                            >
                              Add Question
                            </button>
                          </div>

                          <div>
                            <h1 className="navfont font-bold text-xl">
                              {" "}
                              Your Questions
                            </h1>
                            {testQuestion1.map((item, index) => (
                              <ul
                                className="bg-green-300 p-4 rounded m-2"
                                key={index}
                              >
                                <h1 className="navfont font-bold">
                                  Q{index + 1}. {item.question}
                                </h1>
                                <li className="navfont bg-green-400 p-2 m-2 rounded">
                                  A.{item.option1}
                                </li>
                                <li className="navfont bg-green-400 p-2 m-2 rounded">
                                  B.{item.option2}
                                </li>
                                <li className="navfont bg-green-400 p-2 m-2 rounded">
                                  C.{item.option3}
                                </li>
                                <li className="navfont bg-green-400 p-2 m-2 rounded">
                                  D.{item.option4}
                                </li>
                                <li className="navfont bg-green-400 p-2 m-2 rounded">
                                  ANSWER:{item.answer}
                                </li>
                                <button
                                  className="navfont text-white bg-green-600 p-2 m-2 rounded"
                                  onClick={() => {
                                    handleUpdateQuestion(index);
                                  }}
                                >
                                  Update
                                </button>
                                <button
                                  className="navfont text-white bg-red-600 p-2 m-2 rounded"
                                  onClick={() => {
                                    handleRemoveQuestion(index);
                                  }}
                                >
                                  Remove
                                </button>
                              </ul>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mt-8 ">
                        <h1 className="navfont font-bold text-xl">
                          Question Stage 2
                        </h1>

                        <div className="flex flex-col my-2">
                          <label
                            htmlFor="status"
                            className="text-stone-600 text-sm font-medium navfont"
                          >
                            Add Stage 2 Questions
                          </label>
                          <input
                            id="status"
                            name="question"
                            type="text"
                            value={question}
                            onChange={handleChange}
                            className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 my-2"
                            placeholder="Enter the question"
                          />
                          <div className="flex flex-wrap">
                            <div className="mx-2">
                              <label
                                htmlFor="status"
                                className="text-stone-600 text-sm font-medium navfont"
                              >
                                Option A.
                              </label>
                              <input
                                id="status"
                                name="option1"
                                type="text"
                                value={option1}
                                onChange={handleChange}
                                className="mt-2 block rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 my-2 w-72"
                                placeholder="Enter the option A answer"
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="status"
                                className="text-stone-600 text-sm font-medium navfont"
                              >
                                Option B.
                              </label>
                              <input
                                id="status"
                                name="option2"
                                type="text"
                                value={option2}
                                onChange={handleChange}
                                className="mt-2 block rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 my-2 w-72"
                                placeholder="Enter the option B answer"
                              />
                            </div>
                            <div className="mx-2">
                              <label
                                htmlFor="status"
                                className="text-stone-600 text-sm font-medium navfont"
                              >
                                Option C.
                              </label>
                              <input
                                id="status"
                                name="option3"
                                type="text"
                                value={option3}
                                onChange={handleChange}
                                className="mt-2 block rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 my-2 w-72"
                                placeholder="Enter the option C answer"
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="status"
                                className="text-stone-600 text-sm font-medium navfont"
                              >
                                Option D.
                              </label>
                              <input
                                id="status"
                                name="option4"
                                type="text"
                                value={option4}
                                onChange={handleChange}
                                className="mt-2 block rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 my-2 w-72"
                                placeholder="Enter the option D answer"
                              />
                            </div>
                            <div className="w-full">
                              <label
                                htmlFor="status"
                                className="text-stone-600 text-sm font-medium navfont"
                              >
                                Answer
                              </label>
                              <select
                                id="status"
                                name="answer"
                                value={answer}
                                onChange={handleChange}
                                className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 "
                              >
                                <option>Select</option>
                                <option value="option1">Option A</option>
                                <option value="option2">Option B</option>
                                <option value="option3">Option C</option>
                                <option value="option4">Option D</option>
                              </select>
                            </div>
                            <button
                              className="p-3 m-2 mavfont bg-green-600 rounded font-bold text-white w-full"
                              onClick={handleAddQuestionStage2}
                            >
                              Add Question
                            </button>
                          </div>

                          <div>
                            <h1 className="navfont font-bold text-xl">
                              {" "}
                              Your Questions
                            </h1>
                            {testQuestion2.map((item, index) => (
                              <ul
                                className="bg-green-300 p-4 rounded m-2"
                                key={index}
                              >
                                <h1 className="navfont font-bold">
                                  Q{index + 1}. {item.question}
                                </h1>
                                <li className="navfont bg-green-400 p-2 m-2 rounded">
                                  A.{item.option1}
                                </li>
                                <li className="navfont bg-green-400 p-2 m-2 rounded">
                                  B.{item.option2}
                                </li>
                                <li className="navfont bg-green-400 p-2 m-2 rounded">
                                  C.{item.option3}
                                </li>
                                <li className="navfont bg-green-400 p-2 m-2 rounded">
                                  D.{item.option4}
                                </li>
                                <li className="navfont bg-green-400 p-2 m-2 rounded">
                                  ANSWER:{item.answer}
                                </li>
                                <button
                                  className="navfont text-white bg-green-600 p-2 m-2 rounded"
                                  onClick={() => {
                                    handleUpdateQuestionStage2(index);
                                  }}
                                >
                                  Update
                                </button>
                                <button
                                  className="navfont text-white bg-red-600 p-2 m-2 rounded"
                                  onClick={() => {
                                    handleRemoveQuestionStage2(index);
                                  }}
                                >
                                  Remove
                                </button>
                              </ul>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mt-8 ">
                        <h1 className="navfont font-bold text-xl">
                          Question Stage 3 (Logic in text round)
                        </h1>

                        <div className="flex flex-col my-2">
                          <label
                            htmlFor="status"
                            className="text-stone-600 text-sm font-medium navfont"
                          >
                            Add Stage 3 Questions
                          </label>
                          <input
                            id="status"
                            name="question"
                            type="text"
                            value={question}
                            onChange={handleChange}
                            className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 my-2"
                            placeholder="Enter the question"
                          />

                          <button
                            className="p-3 m-2 mavfont bg-green-600 rounded font-bold text-white w-full"
                            onClick={handleAddQuestionStage3}
                          >
                            Add Question
                          </button>
                          <div>
                            <h1 className="navfont font-bold text-xl">
                              {" "}
                              Your Questions
                            </h1>
                            {testQuestion3.map((item, index) => (
                              <ul
                                className="bg-green-300 p-4 rounded m-2"
                                key={index}
                              >
                                <h1 className="navfont font-bold">
                                  Q{index + 1}. {item.question}
                                </h1>
                                <button
                                  className="navfont text-white bg-green-600 p-2 m-2 rounded"
                                  onClick={() => {
                                    handleUpdateQuestionStage3(index);
                                  }}
                                >
                                  Update
                                </button>
                                <button
                                  className="navfont text-white bg-red-600 p-2 m-2 rounded"
                                  onClick={() => {
                                    handleRemoveQuestionStage3(index);
                                  }}
                                >
                                  Remove
                                </button>
                              </ul>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mt-8 ">
                        <h1 className="navfont font-bold text-xl">
                          Question Stage 4 (Logic in coding round)
                        </h1>

                        <div className="flex flex-col my-2">
                          <label
                            htmlFor="status"
                            className="text-stone-600 text-sm font-medium navfont"
                          >
                            Add Stage 4 Questions
                          </label>
                          <input
                            id="status"
                            name="question"
                            type="text"
                            value={question}
                            onChange={handleChange}
                            className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 my-2"
                            placeholder="Enter the question"
                          />

                          <button
                            className="p-3 m-2 mavfont bg-green-600 rounded font-bold text-white w-full"
                            onClick={handleAddQuestionStage4}
                          >
                            Add Question
                          </button>
                          <div>
                            <h1 className="navfont font-bold text-xl">
                              {" "}
                              Your Questions
                            </h1>
                            {testQuestion4.map((item, index) => (
                              <ul
                                className="bg-green-300 p-4 rounded m-2"
                                key={index}
                              >
                                <h1 className="navfont font-bold">
                                  Q{index + 1}. {item.question}
                                </h1>
                                <button
                                  className="navfont text-white bg-green-600 p-2 m-2 rounded"
                                  onClick={() => {
                                    handleUpdateQuestionStage4(index);
                                  }}
                                >
                                  Update
                                </button>
                                <button
                                  className="navfont text-white bg-red-600 p-2 m-2 rounded"
                                  onClick={() => {
                                    handleRemoveQuestionStage4(index);
                                  }}
                                >
                                  Remove
                                </button>
                              </ul>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex">
                        <button
                          className="active:scale-95 rounded-lg bg-gray-200 px-8 py-2 font-medium text-gray-600 outline-none focus:ring hover:opacity-90 navfont"
                          onClick={handleCloseQuestion}
                        >
                          Cancel
                        </button>
                        {!isUpdate && (
                          <button
                            className="active:scale-95 rounded-lg bg-blue-600 px-8 py-2 font-medium text-white outline-none focus:ring hover:opacity-90 navfont"
                            onClick={handleSubmitQuestion}
                          >
                            Submit all questions
                          </button>
                        )}
                        {isUpdate && (
                          <button
                            className="active:scale-95 rounded-lg bg-green-600 px-8 py-2 font-medium text-white outline-none focus:ring hover:opacity-90 navfont"
                            onClick={handleUpdateQuestionModal}
                          >
                            Update Question
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </Box>
              </Modal>
              <Modal
                open={openUpdateQuestion}
                onClose={handleCloseUpdateQuestion}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <div
                    className="absolute top-2 right-2 text-purple-600"
                    onClick={handleCloseUpdateQuestion}
                  >
                    <IoMdCloseCircle className="text-4xl" />
                  </div>
                  <div className="m-2 w-full px-4 lg:px-8 py-4 mx-auto overflow-scroll max-h-[80vh]">
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
                      <h2 className="text-black text-xl font-bold navfont">
                        Update Questions for the test
                      </h2>
                      <p className="mt-1 text-sm navfont">
                        Update the question for the test
                      </p>

                      <div className="mt-8 ">
                        <div className="flex flex-col my-2">
                          <label
                            htmlFor="status"
                            className="text-stone-600 text-sm font-medium navfont"
                          >
                            Update Question
                          </label>
                          <input
                            id="status"
                            name="question"
                            type="text"
                            value={question}
                            onChange={handleChange}
                            className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 my-2"
                            placeholder="Enter the question"
                          />
                          {updateStage != 3 && updateStage != 4 && (
                            <>
                              <div className="flex flex-wrap">
                                <div className="mx-2">
                                  <label
                                    htmlFor="status"
                                    className="text-stone-600 text-sm font-medium navfont"
                                  >
                                    Option A.
                                  </label>
                                  <input
                                    id="status"
                                    name="option1"
                                    type="text"
                                    value={option1}
                                    onChange={handleChange}
                                    className="mt-2 block rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 my-2 w-72"
                                    placeholder="Enter the option A answer"
                                  />
                                </div>
                                <div>
                                  <label
                                    htmlFor="status"
                                    className="text-stone-600 text-sm font-medium navfont"
                                  >
                                    Option B.
                                  </label>
                                  <input
                                    id="status"
                                    name="option2"
                                    type="text"
                                    value={option2}
                                    onChange={handleChange}
                                    className="mt-2 block rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 my-2 w-72"
                                    placeholder="Enter the option B answer"
                                  />
                                </div>
                                <div className="mx-2">
                                  <label
                                    htmlFor="status"
                                    className="text-stone-600 text-sm font-medium navfont"
                                  >
                                    Option C.
                                  </label>
                                  <input
                                    id="status"
                                    name="option3"
                                    type="text"
                                    value={option3}
                                    onChange={handleChange}
                                    className="mt-2 block rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 my-2 w-72"
                                    placeholder="Enter the option C answer"
                                  />
                                </div>
                                <div>
                                  <label
                                    htmlFor="status"
                                    className="text-stone-600 text-sm font-medium navfont"
                                  >
                                    Option D.
                                  </label>
                                  <input
                                    id="status"
                                    name="option4"
                                    type="text"
                                    value={option4}
                                    onChange={handleChange}
                                    className="mt-2 block rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 my-2 w-72"
                                    placeholder="Enter the option D answer"
                                  />
                                </div>
                                <div className="w-full">
                                  <label
                                    htmlFor="status"
                                    className="text-stone-600 text-sm font-medium navfont"
                                  >
                                    Answer
                                  </label>
                                  <select
                                    id="status"
                                    name="answer"
                                    value={answer}
                                    onChange={handleChange}
                                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 "
                                  >
                                    <option>Select</option>
                                    <option value="option1">Option A</option>
                                    <option value="option2">Option B</option>
                                    <option value="option3">Option C</option>
                                    <option value="option4">Option D</option>
                                  </select>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex">
                        <button
                          className="active:scale-95 rounded-lg bg-gray-200 px-8 py-2 font-medium text-gray-600 outline-none focus:ring hover:opacity-90 navfont"
                          onClick={handleUpdateQuestion}
                        >
                          Cancel
                        </button>
                        {updateStage == 1 && (
                          <button
                            className="active:scale-95 rounded-lg bg-blue-600 px-8 py-2 font-medium text-white outline-none focus:ring hover:opacity-90 navfont"
                            onClick={handleUpdateQuestionArray}
                          >
                            Update Now ({updateStage})
                          </button>
                        )}
                        {updateStage == 2 && (
                          <button
                            className="active:scale-95 rounded-lg bg-blue-600 px-8 py-2 font-medium text-white outline-none focus:ring hover:opacity-90 navfont"
                            onClick={handleUpdateQuestionArrayStage2}
                          >
                            Update Now ({updateStage})
                          </button>
                        )}
                        {updateStage == 3 && (
                          <button
                            className="active:scale-95 rounded-lg bg-blue-600 px-8 py-2 font-medium text-white outline-none focus:ring hover:opacity-90 navfont"
                            onClick={handleUpdateQuestionArrayStage3}
                          >
                            Update Now ({updateStage})
                          </button>
                        )}
                        {updateStage == 4 && (
                          <button
                            className="active:scale-95 rounded-lg bg-blue-600 px-8 py-2 font-medium text-white outline-none focus:ring hover:opacity-90 navfont"
                            onClick={handleUpdateQuestionArrayStage4}
                          >
                            Update Now ({updateStage})
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </Box>
              </Modal>
            </section>
          </>
        )}
      </FullLayout>
    </ThemeProvider>
  );
};

export default Myaccount;
