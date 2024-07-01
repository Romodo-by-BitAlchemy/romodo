//Controllers/issueReportControllers.js
import asyncHandler from 'express-async-handler';
import IssueModel from '../Models/Issue.js';

export const fetchIssues = asyncHandler(async (req, res) => {
  const issues = await IssueModel.find({});
  res.json(issues);
});
