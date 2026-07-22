#violates srp
class Report:
    def __init__(self, data):
        self.data = data

    def build(self):
        return f"Report:\n{self.data}"

    def save(self, path):
        content = self.build()
        with open(path, "w") as f:
            f.write(content)

    def email(self, email ):
        content = self.build()
        return f"sending {content} to {self.email}"
#with srp
  