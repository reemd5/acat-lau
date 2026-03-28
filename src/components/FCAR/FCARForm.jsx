import { useEffect, useState } from "react";
import CourseHeader from "./CourseHeader";
import GradeDistributionGrid from "./GradeDistributionGrid";
import SLOSection from "./SLOSection";
import ImprovementsSection from "./ImprovementsSection";
import SubmitControls from "./SubmitControls";
import { getCourseSLOs } from "../../api/slos";

export default function FCARForm({
  courseId,
  submissionId,
  schema,          // Form_Versions.Schema_JSON
  courseInfo       // course code, title, semester, year
}) {
  const [slos, setSlos] = useState([]);

  useEffect(() => {
    if (!courseId) return;

    getCourseSLOs(courseId)
      .then(res => setSlos(res.data))
      .catch(err => console.error("Failed to load SLOs", err));
  }, [courseId]);

  return (
    <>
      <CourseHeader courseInfo={courseInfo} />

      <GradeDistributionGrid submissionId={submissionId} />

      {slos.map((slo) => (
        <SLOSection
          key={slo.SLO_ID}
          slo={slo}
          pcs={schema?.slos?.[slo.SLO_Code]?.pcs || []}
          submissionId={submissionId}
        />
      ))}

      <ImprovementsSection submissionId={submissionId} />

      <SubmitControls submissionId={submissionId} />
    </>
  );
}
