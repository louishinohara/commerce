export default function FAQSection({ faqs }: { faqs: { question: string; answer: string }[] }) {
    return (
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b pb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{faq.question}</h2>
            <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
          </div>
        ))}
      </div>
    );
  }
  