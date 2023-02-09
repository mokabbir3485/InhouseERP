using System;
using System.Collections.Generic;
using ExportDAL;
using ExportEntity;

namespace ExportBLL
{
    public class exp_UploadAttachmentBLL //: IDisposible
    {
        public exp_UploadAttachmentBLL()
        {
            //exp_ApprovalDAO = exp_Approval.GetInstanceThreadSafe;
            exp_UploadAttachmentDAO = new exp_UploadAttachmentDAO();
        }

        public exp_UploadAttachmentDAO exp_UploadAttachmentDAO { get; set; }

        public List<exp_UploadAttachment> GetAll()
        {
            try
            {
                return exp_UploadAttachmentDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public string Add(exp_UploadAttachment exp_UploadAttachment)
        {
            try
            {
                return exp_UploadAttachmentDAO.Add(exp_UploadAttachment);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void Update(exp_UploadAttachment exp_UploadAttachment)
        {
            try
            {
                exp_UploadAttachmentDAO.Update(exp_UploadAttachment);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}