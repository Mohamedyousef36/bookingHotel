import expressAsyncHandler from "express-async-handler";
import createError from "../utils/error.js";
import ApiFeature from "../utils/apiFeature.js";


export const createDocument = (modelName) =>
  expressAsyncHandler(async (req, res, next) => {
    const document = await modelName.create(req.body);
    res.status(201).json({ Message: "Success", data: document })

  }
  )

export const updateDocument = (modelName) => expressAsyncHandler(
  async (req, res, next) => {

    const document = await modelName.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    await document.save()
    res.status(200).json({ message: "Success", data: document });
    if (!document) {
      return next(createError(404, 'No Document Found To Update'))
    }
  }
)

export const deleteDocument = (modelName) =>
  expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const deletedOne = await modelName.findByIdAndDelete(id);
    if (!deletedOne) {
      return next(createError(404, `No Document Found To Delete`));
    }
    res.status(201).json({ message: 'Success Deleting .....' })
  }
  );

export const getDocument = (modelName) =>
  expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await modelName.findById(id)

    if (!document) {
      return next(createError(404, `No Document Found To Delete`));
    }
    res.status(200).json({ message: "Success", data: document })


  }
  )


export const getAllDocuments = (modelName) =>
  expressAsyncHandler(async (req, res, next) => {
    // Building Query
    const numberOfDocuments =await modelName.countDocuments()
    const apiFeature = new ApiFeature(modelName.find(), req.query)
      .filtering()
      .pagination(numberOfDocuments)
      .fields()
      .sorting()
      .fields()
      .searching();
     
    
    // Execute Query
    const {buildingQuery,paginationResult} = apiFeature
    const documents = await buildingQuery;
    if (!documents) {
      return next(createError(404, `No Document Found To Get`));
    }

    res.status(200).json({
      message: "Success",
      result: paginationResult,
      numberOfDocuments: documents.length,
      data: documents,
    });
  });

