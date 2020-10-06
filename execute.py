from poetry_dep1.dep import Dep


def main():
    d = Dep({"a","b"})
    print(d.has_name("a"))


if __name__ == "__main__":
    main()
