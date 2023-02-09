using System;
using System.Collections.Generic;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class ad_NoticeBLL //: IDisposible
    {
        public ad_NoticeBLL()
        {
            //ad_NoticeDAO = ad_Notice.GetInstanceThreadSafe;
            ad_NoticeDAO = new ad_NoticeDAO();
        }

        public ad_NoticeDAO ad_NoticeDAO { get; set; }

        public List<ad_Notice> GetByUserId(int userId)
        {
            try
            {
                return ad_NoticeDAO.GetByUserId(userId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_Notice> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return ad_NoticeDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_Notice> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                return ad_NoticeDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(ad_Notice _ad_Notice)
        {
            try
            {
                return ad_NoticeDAO.Add(_ad_Notice);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(ad_Notice _ad_Notice)
        {
            try
            {
                return ad_NoticeDAO.Update(_ad_Notice);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long noticeId)
        {
            try
            {
                return ad_NoticeDAO.Delete(noticeId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //public int UpdateShift(Int64 shiftId, TimeSpan startedTime, TimeSpan endedTime, bool isOnLeave, bool isLateInApproved, string lateInApproveRemarks)
        public int UpdateShift(long shiftId, bool isOnLeave, bool isLateInApproved, string lateInApproveRemarks)
        {
            try
            {
                //return ad_NoticeDAO.UpdateShift(shiftId, startedTime, endedTime, isOnLeave, isLateInApproved, lateInApproveRemarks);
                return ad_NoticeDAO.UpdateShift(shiftId, isOnLeave, isLateInApproved, lateInApproveRemarks);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long AddShift(int empId, int attPolicyId, string shiftDate, int isWH, int isPH, int isHD, string start,
            string end)
        {
            try
            {
                return ad_NoticeDAO.AddShift(empId, attPolicyId, shiftDate, isWH, isPH, isHD, start, end);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}